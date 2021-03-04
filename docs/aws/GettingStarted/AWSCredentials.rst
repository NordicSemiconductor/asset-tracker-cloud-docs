.. _aws-getting-started-aws-credentials:

Provide your AWS credentials
############################

To set up the *nRF Asset Tracker* on AWS, you must first provide the AWS credentials.

.. note::

   It is recommended to install these resources in a blank AWS account to clearly separate them from your other projects.
   See the `best practices for setting up your multi-account AWS environment <https://aws.amazon.com/organizations/getting-started/best-practices/>`_.
   After you have registered your personal account, sign up for `AWS Organizations <https://aws.amazon.com/organizations/>`_ and create an account for the *nRF Asset Tracker*.
   You can have many accounts, without extra costs.
   
To provide the AWS credentials to the *Asset Tracker Cloud Example*, complete the following steps:

1.  Navigate to your `IAM console <https://console.aws.amazon.com/iam/home?region=us-east-1#/home>`_ and add a new user for `programmatic access <https://wa.aws.amazon.com/wat.question.SEC_3.en.html>`_.

#.  Attach the ``arn:aws:iam::aws:policy/AdministratorAccess`` policy directly.

    .. note::

       This action will create a user with full access rights to the account, and therefore it must only be created in an account dedicated for the nRF Asset Tracker.

#.  Create *Security credentials* for the user.

#.  Add the *Access key ID* and *Secret access key*, to a new :file:`.envrc` file (:ref:`used with direnv <about-direnv>`), as shown in the following code:

    .. code-block:: bash

      # add to .envrc
      export AWS_ACCESS_KEY_ID="<value of Access key ID>"
      export AWS_SECRET_ACCESS_KEY="<value of Secret access key>"

#.  Add your preferred region to the :file:`.envrc` file, as shown in the following code (``eu-west-1`` is a safe example):

    .. code-block:: bash

      # add to .envrc
      export AWS_DEFAULT_REGION="<your preferred AWS region>"
      export AWS_REGION="<your preferred AWS region>"

    .. note::

       Not all AWS features are available in all AWS regions.
       You will see a warning if you are deploying to a region that has not been tested and the AWS CDK might fail.
       The `list of supported regions <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/blob/b2b020dd9e71a5a42db48bec7f1eea739bc73237/cdk/regions.ts>`_ can be found in the repository.

#.  Run the following command to allow the changed ``.envrc`` file:

    .. code-block:: bash

      direnv allow
