.. _versioning:

Versioning
##########

.. contents::
   :local:
   :depth: 2

The `semantic-release <https://github.com/semantic-release/semantic-release>`_ tool is used to automatically determine the next version of the project and publish a release in the GitHub project as well as release it to the ``@NordicSemiconductor`` npm organization .

The next version is determined by scanning the commit messages.
The commit messages must follow the `Angular commit message rules <https://github.com/semantic-release/semantic-release#commit-message-format>`_, and in every library `a hook <https://github.com/marionebl/commitlint>`_ will check the commit messages against these rules.

.. note::

   The ``package.json`` of a project must contain only ``0.0.0-development`` as  the ``version`` property.
   Semantic-release will ignore the value.
   Only the published package on npm will contain the correct version number.


.. _guides-versionining-how-to-release-a-new-version-of-a-package:

Releasing a new version of a package
************************************

Consider the example of a library, which has the npm version ``2.3.4``.

A new version will be published by the respective project's CI run.
Use the commit messages that follow the `schema for the commit message <https://github.com/semantic-release/semantic-release#commit-message-format>`_.

Following are the three commit messages that triggers a release:

* Patch release 

  .. code-block:: bash

      fix: <commit message>

* Feature release

  .. code-block:: bash

     feat: <commit message>

* Breaking Release

  .. code-block:: bash

     <scope>: <commit message>
    
     BREAKING CHANGE:
    
     <description of breaking change>

.. note::

    A commit message of a different format *will not trigger* a release.

Patch release (fix)
===================

A fix is a change to the implementation, which removes a bug *without changing the public API* (method names and signatures, exports) of the library.
The consumer of the library need not change their implementation when installing the fixed version.

To release a fix (which will update the version from ``2.3.4`` to ``2.3.5``), use the type ``fix`` in the commit message:

.. code-block:: bash

    fix: <commit message>

You can optionally add a scope, which is a lowercase string that is used to identify the affected *component*.

.. code-block:: bash

    fix(<scope>): <commit message>

Scopes are useful when the project is big.

Feature release (feat)
======================

A feature is a change to the implementation of a library which adds additional functionality *without changing the public API* of the library.

You may add new exports, methods and extra method arguments that are optional, but the consumer of the library need not change their implementation when installing the library with the new feature.

To release a feature (which will update the version from ``2.3.4`` to ``2.4.0``), use the type ``feat`` in the commit message:

.. code-block:: bash

    feat: <commit message>

You can optionally add a scope as well.

Breaking Release (BREAKING CHANGE:)
===================================

Whenever the public API of the library changes in a way that requires the consumer to update their implementation, *you must mark the change as breaking*. 
This can happen in the following conditions:

* Method names and arguments are renamed
* Previously optional arguments become mandatory
* Arguments are removed
* Classes are renamed

Even if the change is very small, as soon as you break the library's *contract* (its public API), it is a breaking change according to `Semantic Versioning 2.0.0  <https://semver.org/#spec-item-8>`_.

To do a breaking release (which will update the version from ``2.3.4`` to ``3.0.0``), use the text :code:`BREAKING CHANGE:` (followed by a space of two new lines) in the commit message:

.. code-block:: bash

    refactor: <commit message>
    
    BREAKING CHANGE:
    
    <description of breaking change>

You can optionally add a scope as well.

Note that in the case of a breaking release, the message type (``refactor`` in the example) can be any valid type.

Typical changes
***************

Some of the typical changes that you make on the repository are updating the dependencies or refactoring.

Updating the dependencies
=========================

If you are manually updating the dependencies in a library, you must commit the change as a fix, so that the consumers also use the updated dependencies.

Refactoring
===========

If you perform a pure refactoring of a library without changing the features and the public API and if you require the refactored version in your consumers, commit the refactoring as a feature.
In this case you are improving the library, which qualifies as a feature.
For example, a performance improvement can be a feature.

Publishing the releases
***********************

After you have pushed your changes to the remote repository, a job will be run on the CI runner.
If the job completes successfully (for example, if all the tests pass and the linter does not report any errors), ``semantic-release`` will determine the next version to be released.

The *highest* commit takes *precedence* (``fix`` > ``feat`` > ``breaking change``).
This means that if the list of commit messages since the last release contains *only* fixes, the patch version will be incremented (:code:`2.3.4 -> 2.3.5`).
If the list of commits contains at least one new feature, then the minor version will be incremented and the patch version will be set to ``0`` (``2.3.4 -> 2.4.0``).
If the list of commits contains at least one breaking change, then the major version will be incremented, and the minor and patch versions will be set to ``0`` (``2.3.4 -> 3.0.0``).
