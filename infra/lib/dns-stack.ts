import { Stack, StackProps } from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export class DNSStack extends Stack {
  public hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fullyQualifiedDomain = this.node.tryGetContext("fullyQualifiedDomain");
    const subDomain = this.node.tryGetContext("subDomain");

    if (!fullyQualifiedDomain) {
      throw new Error(
        "No context value found for 'fullyQualifiedDomain'. " +
          "Set it in cdk.json or use: cdk deploy -c fullyQualifiedDomain=<value>"
      );
    }

    if (!subDomain) {
      throw new Error(
        "No context value found for 'subDomain'. " +
          "Set it in cdk.json or use: cdk deploy -c subDomain=<value>"
      );
    }

    const domainName = `${subDomain}.${fullyQualifiedDomain}`;

    // Look up existing hosted zone instead of creating a new one
    // This assumes the hosted zone for the root domain already exists
    this.hostedZone = route53.HostedZone.fromLookup(this, "PstrHostedZone", {
      domainName: fullyQualifiedDomain,
    });
  }

  public getDomainName(): string {
    const fullyQualifiedDomain = this.node.tryGetContext("fullyQualifiedDomain");
    const subDomain = this.node.tryGetContext("subDomain");
    return `${subDomain}.${fullyQualifiedDomain}`;
  }
}
