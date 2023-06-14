import * as core from "@actions/core";
import AWS from "aws-sdk/global";
import EC2 from "aws-sdk/clients/ec2";

const region = core.getInput('aws-region', { required: true });
const accessKeyId = core.getInput('aws-access-key-id', { required: true });
const secretAccessKey = core.getInput('aws-secret-access-key', { required: true });
const groupIds = core
  .getInput('aws-security-group-id', { required: true })
  .split(',')
  .map(item => item.trim());
const port = parseInt(core.getInput('port', { required: false }));

const toPortInput = core.getInput('to-port', { required: false });
const toPort = toPortInput.length > 0 ? parseInt(toPortInput) : false;

const description = core.getInput('description', { required: false });
const protocol = core.getInput('protocol', { required: false });

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
});
const ec2 = new EC2();

export {
  region,
  accessKeyId,
  secretAccessKey,
  groupIds,
  port,
  toPort,
  protocol,
  description,
  ec2,
};
