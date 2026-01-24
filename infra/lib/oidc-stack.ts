import { Stack, StackProps, CfnOutput, Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface OidcStackProps extends StackProps {
  /**
   * GitHub organization or username
   */
  readonly githubOrg: string;

  /**
   * GitHub repository name
   */
  readonly githubRepo: string;

  /**
   * GitHub tag patterns that can assume the role
   * Supports wildcards (e.g., ["v*"] for all tags starting with 'v')
   * @default - ["v*"]
   */
  readonly githubTagPatterns?: string[];
}

export class OidcStack extends Stack {
  public readonly deployRole: iam.Role;

  constructor(scope: Construct, id: string, props: OidcStackProps) {
    super(scope, id, props);

    const { githubOrg, githubRepo } = props;
    const githubTagPatterns = props.githubTagPatterns ?? ["v*"];

    // Create the GitHub OIDC provider
    const githubProvider = new iam.OpenIdConnectProvider(
      this,
      "GitHubOidcProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    // Create the IAM role that GitHub Actions will assume
    this.deployRole = new iam.Role(this, "GitHubActionsDeployRole", {
      roleName: "GitHubActionsPstrDeployRole",
      assumedBy: new iam.FederatedPrincipal(
        githubProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": githubTagPatterns.map(
              (tagPattern) =>
                `repo:${githubOrg}/${githubRepo}:ref:refs/tags/${tagPattern}`
            ),
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      description:
        "Role assumed by GitHub Actions for deploying PWA Share Target Data Revealer",
      maxSessionDuration: Duration.hours(1),
    });

    // Grant administrator access for CDK deployments
    // Note: In production, you should scope this down to specific permissions
    this.deployRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
    );

    // Output the role ARN for use in GitHub Actions
    new CfnOutput(this, "DeployRoleArn", {
      value: this.deployRole.roleArn,
      description: "ARN of the IAM role for GitHub Actions to assume",
      exportName: "GitHubActionsPstrDeployRoleArn",
    });
  }
}
