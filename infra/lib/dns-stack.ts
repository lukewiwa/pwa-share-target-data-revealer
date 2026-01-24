import { Stack, StackProps } from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export class DNSStack extends Stack {
  public hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fullyQualifiedDomain =
      this.node.tryGetContext("fullyQualifiedDomain");

    if (!fullyQualifiedDomain) {
      throw new Error(
        "No context value found for 'fullyQualifiedDomain'. " +
          "Set it in cdk.json or use: cdk deploy -c fullyQualifiedDomain=<value>"
      );
    }

    // Create a new hosted zone for this domain
    this.hostedZone = new route53.HostedZone(this, "PstrHostedZone", {
      zoneName: fullyQualifiedDomain,
    });
  }
}
