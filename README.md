# grunt-task-unexpose-rest-path-loopback-swagger
A Grunt task that automates the un-publishing / un-exposing (public:false) of all REST paths except specified ones in an NodeJS API generated with LoopBack and Swagger

## Context : creating an API with less coding and more automatic documentation

This Grunt task is useful in the context of a NodeJS API that you want to create using Swagger for the specification and LoopBack for the framework.

This allows optimum back-and-forth cycle between documentation and code generation.

Thanks to combining Swagger and LoopBack, creating a REST API becomes easier to share, document, maintain, expand.

**What is this Grunt task solving :**

By default, LoopBack exposes all the REST paths defined in your Swagger file, including the ones the Models (Swagger definitions) implicitely defines.

All those generated REST paths are available through http requests and are visible in the Swagger explorer.
Usually you only want to generate and expose the REST services your defined in the Swagger file and NOT the ones related to the Models you defined in 'definitions'.

You can remove those remote methods with LoopBack disableRemoteMethods (see [http://stackoverflow.com/questions/26959830/how-to-disable-certain-http-methods-e-g-post-for-persistedmodel-in-loopback-f](http://stackoverflow.com/questions/26959830/how-to-disable-certain-http-methods-e-g-post-for-persistedmodel-in-loopback-f)).
But this is not a perfect solution.
Or you can change `/server/model-config.json` {`public`:...} fields from `true` (by default) to `false` for each REST path that you want to un-expose.

**Problem :**

However, everytime you refresh your Loopback API from a new Swagger file version (typically with a `slc loopback:swagger myswaggerfilename` command from the project root), LoopBack will **reset** all your changes in `/server/model-config.json`.

**Solution :**

Running the Grunt task "grunt-task-unexpose-rest-path-loopback-swagger" will allow you to automate the un-exposure process and report it back to you.

## Dependencies of the project

- a Swagger file for the specification/description of your API
- LoopBack base project
- Grunt

## Initial setup of the Grunt task "grunt-task-unexpose-rest-path-loopback-swagger"

The Grunt task "grunt-task-unexpose-rest-path-loopback-swagger" creates a backup of the original `/server/model-config.json` file.
Then is loops through all the available REST paths and exposes only the onles specified in the javascript array `list_of_REST_path_to_EXPOSE`.

1. Change the list of REST path you want to expose : javascript var `list_of_REST_path_to_EXPOSE`.
2. Change the backup folder : javascript var `backup_folder`.

## Related posts this Grunt task is solving

- [http://stackoverflow.com/questions/26959830/how-to-disable-certain-http-methods-e-g-post-for-persistedmodel-in-loopback-f](http://stac- [https://github.com/strongloop/loopback/issues/651](https://github.com/strongloop/loopback/issues/651)
koverflow.com/questions/26959830/how-to-disable-certain-http-methods-e-g-post-for-persistedmodel-in-loopback-f)
- [https://github.com/strongloop/loopback/issues/768](https://github.com/strongloop/loopback/issues/768)
- [https://github.com/strongloop/loopback/issues/465](https://github.com/strongloop/loopback/issues/465)
- [https://docs.strongloop.com/display/public/LB/Exposing+models+over+REST#ExposingmodelsoverREST-HidingmethodsandRESTendpoints](https://docs.strongloop.com/display/public/LB/Exposing+models+over+REST#ExposingmodelsoverREST-HidingmethodsandRESTendpoints)

## Swagger and its editor

**References :**

- Main Swagger project web site : [http://swagger.io](http://swagger.io)
- Swagger online editor : [http://editor.swagger.io/#/edit](http://editor.swagger.io/#/edit)

## LoopBack : open source NodeJS API generator framework

**References :**

- Main LoopBack project web site : [http://loopback.io](http://loopback.io)
- Simple Loopback Project Example : [https://github.com/strongloop/loopback-getting-started](https://github.com/strongloop/loopback-getting-started)
- Generate a LoopBack NodeJS API from a Swagger file (like swagger_specifications_myproject.yaml or swagger_specifications_myproject.json that the Swagger Editor helps generate) : [https://docs.strongloop.com/display/APIC/Swagger+generator](https://docs.strongloop.com/display/APIC/Swagger+generator)

## Grunt

**References :**

- Main GruntJS web site [http://gruntjs.com](http://gruntjs.com)
- Grunt custom tasks [http://gruntjs.com/creating-tasks#custom-tasks](http://gruntjs.com/creating-tasks#custom-tasks)


