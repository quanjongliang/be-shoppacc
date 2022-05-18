"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const core_1 = require("../../core");
const common_1 = require("@nestjs/common");
const Roles = (...roles) => (0, common_1.SetMetadata)(core_1.ROLE_CONTEXT, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map