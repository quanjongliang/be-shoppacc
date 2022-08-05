import { CloundinaryService } from "@/cloudinary";
import { BaseQueryResponse, POST_CONFIG, POST_MESSAGE } from "@/core";
import { Post, POST_RELATION, User } from "@/entity";
import { PostRepository, TagRepository } from "@/repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { In } from "typeorm";
import {
  CreatePostDto,
  QueryPostDto,
  QueryPostTagDto,
  UpdatePostDto,
} from "../dto";
import { changeToSlug } from "../util";

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private cloundinaryService: CloundinaryService,
    private tagRepository: TagRepository
  ) {}

  async createNewPost(
    createPostDto: CreatePostDto,
    user: User,
    file?: Express.Multer.File
  ): Promise<Post> {
    const { title, content, tags, description, keyword = "" } = createPostDto;
    const cloundinary = file
      ? await this.cloundinaryService.uploadFile(file)
      : null;
    const newPost = this.postRepository.create({
      title,
      content,
      user,
      description,
      cloundinary,
      imageUrl: cloundinary.url || cloundinary.secure_url,
      keyword,
    });
    return this.postRepository.save({
      ...newPost,
      slug: changeToSlug(title, new Date()),
    });
  }

  async deletePost(id: string) {
    try {
      const post = await this.postRepository.findOne({
        where: {
          id,
        },
        relations: [POST_RELATION.CLOUNDINARY],
      });
      if (!post)
        throw new HttpException(POST_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
      return Promise.all([
        this.postRepository.delete(id),
        this.cloundinaryService.deleteFile(post.cloundinary.public_id),
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File
  ) {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: [POST_RELATION.CLOUNDINARY],
      });
      if (!post)
        throw new HttpException(POST_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
      if (file) {
        const image = await this.cloundinaryService.uploadFile(file);
        const { public_id } = post.cloundinary;
        return Promise.all([
          this.cloundinaryService.deleteFile(public_id),
          this.postRepository.save({
            ...post,
            cloundinary: image,
            ...updatePostDto,
            imageUrl: image.url || image.secure_url,
          }),
        ]);
      }
      const slug = updatePostDto.title
        ? changeToSlug(updatePostDto.title, post.createdAt)
        : post.slug;
      return this.postRepository.update({ id }, { ...updatePostDto, slug });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll(queryPost: QueryPostDto): Promise<BaseQueryResponse<Post>> {
    const { offset = 0, limit = POST_CONFIG.LIMIT, slug } = queryPost;
    const where = {};
    if (slug) {
      where["slug"] = slug;
    }
    // const data = await this.postRepository.find({
    //   skip: offset,
    //   take: limit,
    //   relations: [POST_RELATION.CLOUNDINARY],
    //   // select: ['content', 'updatedAt', 'description', 'id', 'title'],
    // });
    // const total = await this.postRepository.count();
    const [total, data] = await Promise.all([
      this.postRepository.count(),
      this.postRepository.find({
        skip: offset,
        take: limit,
        relations: [POST_RELATION.CLOUNDINARY],
        order: {
          createdAt: "DESC",
        },
        // select: ['content', 'updatedAt', 'description', 'id', 'title'],
      }),
    ]);
    return { data, total };
  }

  async getAllByTag(queryPostTag: QueryPostTagDto): Promise<Post[]> {
    try {
      const { offset = 0, limit = POST_CONFIG.LIMIT, tag } = queryPostTag;
      const tags = await this.tagRepository.find({
        where: {
          title: In(tag.split(",")),
        },
      });
      return this.postRepository
        .createQueryBuilder("p")
        .leftJoinAndSelect("p.tags", "tag")
        .where("tag.id In(:...tagIds)", { tagIds: tags.map(({ id }) => id) })
        .offset(offset)
        .limit(limit)
        .getMany();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPostById(id: string): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      select: ["content", "description", "imageUrl", "id", "title", "keyword"],
    });
  }

  async getPostBySlug(slug: string): Promise<Post> {
    return this.postRepository.findOne({
      where: { slug },
      select: ["content", "description", "imageUrl", "id", "title", "keyword"],
    });
  }
}
