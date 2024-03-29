.. _authentication_readme:

Authentication
##############

.. contents::
   :local:
   :depth: 2

The :ref:`nRF Asset Tracker web application <aws-getting-started-app>` on AWS connects to the `AWS IoT broker <https://docs.aws.amazon.com/iot/latest/developerguide/iot-connect-devices.html>`_ using WebSockets, and the authentication is done through `AWS Cognito <https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html>`_.

See the AWS documentation on `Amazon Cognito identities <https://docs.aws.amazon.com/iot/latest/developerguide/cognito-identities.html>`_ and `Policies for HTTP and WebSocket clients <https://docs.aws.amazon.com/iot/latest/developerguide/pub-sub-policy.html#pub-sub-policy-cognito>`_ for more information.

A user authenticated through Amazon Cognito needs the following policies to access AWS IoT:

* A policy attached to the role of the authenticated pool, to authenticate and authorize the Cognito user to communicate with AWS IoT.
* A policy attached to the authenticated Cognito user ID principal for fine-grained permissions.

.. note::

   When authorizing Cognito identities, AWS IoT considers both policies and grants the least privilege among the specified privileges.

A requested action is allowed only if both policies allow it.
If one of the policies prohibit an action, it is considered to be unauthorized.

Example
*******

Following is an example of the authentication process with the specified policies:

IAM policy on the authenticated role:

.. literalinclude:: ./iam-policy.json
  :language: JSON

IoT policy assigned to the Cognito Identity:

.. literalinclude:: ./iot-policy.json
  :language: JSON

The two specified policies are combined using logical AND and only the least privilege of the combined privilege is granted.
Hence, in this example, the user can only subscribe to the ``messages`` topic.
