import * as lambda from 'aws-cdk-lib/aws-lambda';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { CustomReact } from './custom/CustomReact/resource';

const backend = defineBackend({
  auth,
  data,
});

const customNotifications = new CustomReact(
  backend.createStack('CustomReact'),
  'CustomReact'
);