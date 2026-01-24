#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DNSStack } from "../lib/dns-stack";
import { CertificateStack } from "../lib/certificate-stack";
import { InfraStack } from "../lib/infra-stack";
import { OidcStack } from "../lib/oidc-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? "ap-southeast-2",
};

const fullyQualifiedDomain = app.node.tryGetContext("fullyQualifiedDomain");
const subDomain = app.node.tryGetContext("subDomain");
const domainName = `${subDomain}.${fullyQualifiedDomain}`;

// OIDC stack - Creates GitHub OIDC provider and IAM role for GitHub Actions
// This should be deployed first, before other stacks
new OidcStack(app, "PstrOidcStack", {
  env,
  githubOrg: "lukewiwa",
  githubRepo: "pwa-share-target-data-revealer",
  githubBranches: ["master"],
});

// DNS stack - Route53 is global, but we create it in the primary region
const dnsStack = new DNSStack(app, "PstrDNSStack", {
  env,
  crossRegionReferences: true,
});

// Certificate stack - must be in us-east-1 for CloudFront
const certificateStack = new CertificateStack(
  app,
  "PstrCertificateStack",
  dnsStack.hostedZone,
  domainName,
  {
    env: {
      account: env.account,
      region: "us-east-1",
    },
    crossRegionReferences: true,
  }
);
certificateStack.addDependency(dnsStack);

// Infrastructure stack - in primary region
const infraStack = new InfraStack(
  app,
  "PstrInfraStack",
  certificateStack.certificate,
  dnsStack.hostedZone,
  domainName,
  {
    env,
    crossRegionReferences: true,
  }
);
infraStack.addDependency(certificateStack);
infraStack.addDependency(dnsStack);
