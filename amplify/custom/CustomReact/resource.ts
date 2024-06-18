import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CustomReact extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const layer = new lambda.LayerVersion(this, 'MyLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, './layer'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_12.bundlingImage,
          command: [
            'bash', '-c',
            'pip install -r python/requirements.txt -t /asset-output/python && cp -au . /asset-output'
          ],
        },
      }),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_12],
    });

    // Lambda関数の定義
    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './lambda')),
      layers: [layer], // レイヤーを追加
    });
  }
}