import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const defaultDocsPath = '/docs';

export interface SwaggerOptions {
  servers?: string[];
  urlPrefix?: string;
  docsPath?: string;
}

export const setupSwagger = (
  app: INestApplication,
  options?: SwaggerOptions,
) => {
  const config = new DocumentBuilder()
    .setTitle('Location nest project')
    .setDescription(
      'Rest application capable of returning autonomous communities, provinces and municipalities of Spain.',
    )
    .setVersion('0.0.1');

  options?.servers?.forEach((s) => config.addServer(s));

  const urlPrefix = options?.urlPrefix || '';
  let docsPath = options?.docsPath || defaultDocsPath;

  if (!docsPath.startsWith('/')) {
    docsPath = '/' + docsPath;
  }

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(`${urlPrefix}${docsPath}`, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });
};
