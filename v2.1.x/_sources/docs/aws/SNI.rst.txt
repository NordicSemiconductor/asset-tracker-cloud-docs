.. _sni_readme:

Server Name Indication
######################

According to the `Transport security in AWS IoT <https://docs.aws.amazon.com/iot/latest/developerguide/transport-security.html>`_ documentation, the Server Name Indication (SNI) extension is required for TLS, both in the case of MQTT and HTTPS.

However, note the following facts:

* SNI is required when connecting using a certificate that is created using the IoT console or the `RegisterCertificateWithoutCA <https://docs.aws.amazon.com/iot/latest/apireference/API_RegisterCertificateWithoutCA.html>`_ API, which registers the certificate with ``certificateMode`` ``SNI_ONLY``.

  * The devices that are currently connected to AWS IoT through MQTT and not using SNI, are not affected and such devices continue to work with AWS IoT.

* SNI is not required when connecting to AWS IoT through MQTT, using a CA certificate.

  * AWS IoT uses the certificates provided in the TLS connection of MQTT to route the request to the right account (not to the endpoint) using the CA certificate.
    This also means that when using a wrong account endpoint to connect to AWS IoT with a certificate that does not belong to that account endpoint, the request is routed to the correct account endpoint.

* HTTP is handled separately and differently from MQTT and it requires that the SNI bit is set.

* New features such as `Multi-Account registration <https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html#multiple-account-cert>`_ and `Configurable endpoints <https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable.html>`_, require SNI bits in MQTT connection.
  The SNI bit is significant when using these features and AWS IoT uses it to route the request properly.
