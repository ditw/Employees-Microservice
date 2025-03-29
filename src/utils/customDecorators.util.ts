import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSwaggerDocResponse = <TModel extends Type<unknown>>(
  model: TModel,
  type: EResponseTypes,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: {
                type,
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export enum EResponseTypes {
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'object',
  ARRAY = 'array',
}