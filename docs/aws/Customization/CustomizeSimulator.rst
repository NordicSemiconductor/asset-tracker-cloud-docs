.. _app-customization-customize-device-simulator-ui:

Customize the device simulator UI
#################################

It's now time to implement to logic to generate the heart rate monitoring data.
The actual firmware will eventually sample the heartrate in a given interval (e.g. once very minute), and send it to the cloud using a :ref:`batch message <batch>`.
Therefore we modify the device simulator UI:

- add a slider for the heart rate reading between 140 and 220 (which are consider normal cat heart rates)
- use the `queueUpdate` method the send the readings as a batch message

You can see the neccessary changes `in this repository <https://github.com/acme-cat-tracker/simulator-ui/compare/add-heartrate-monitor-data>`_.

.. figure:: ./images/batching-messages.png
   :alt: Creating batched heart rate messages using the device simulator UI

The running device simulator will the send a message like this to the cloud:

.. code-block:: json

    {
        "heartrate": [
            { "v": 157, "ts": 1615467185022 },
            { "v": 163, "ts": 1615467185976 },
            { "v": 191, "ts": 1615467186878 },
            { "v": 205, "ts": 1615467187418 },
            { "v": 208, "ts": 1615467189071 }
        ]
    }



.. admonition:: Maintaining a fork

    In case you want to persist the changes to the device simulator UI in your own repository, you may want to remove all the tags before pushing your modified version:
    
    .. code-block:: bash
    
        git tag -d `git tag | grep -E '.'`
    
    Add the source repository as ``upstream`` so you can later pull in changes: 
    
    .. code-block:: bash
    
        git remote add upstream https://github.com/NordicSemiconductor/asset-tracker-cloud-device-ui-js

    You pull in changes by running the following commands and resolving all conflicts.

    .. code-block:: bash

        git fetch upstream saga
        git rebase upstream/saga