# Hi developer!

I started this project some years ago. I did just for fun and I learned a lot. Although it's not maintained anymore, still today there are some people who clone this project.
If you are one of them and want to say to me whatever you want, please don't hesitate to send me an email to [lajimenez.rock@gmail.com](mailto:lajimenez.rock@gmail.com)

# Documentation

## What is rock.game.js?

rock.game.js is an extension of rock.js framework in order to add 3D capabilities to it.
With rock.game.js you could be able to create 3D scene as well as some basic 3D games.

## 2 projects in one

rock.game.js has 2 parts. The first part is the project itself, meaning that is all you need to create a new game (package 'rock.game').
As this could be difficult if you just aim to display a 3D object, rock.game.js offers a new 'project' to help you to draw some 3D stuff (package 'rock.scene') (you will also have basic operations like rotation, scale,...)
It's very important to notice that scene CAN'T be understanding as an implementation reference.

If you want to see an example of how to use 'rock.scene', please take a look on test examples in this project.
If you want to create a new game, please see how [pong](https://github.com/lajimenez/pong) is implemented.

## JSDoc and examples

You can find JSDoc for all classes [here](https://lajimenez.github.io/rock.game.js/jsdoc)
You can find a scene running example [here](https://lajimenez.github.io/rock.game.js/demo)

## 'Bad' news

rock.game.js doesn't offer renderers for animated models... yet.

## Development

The project has been 'mavenized' so if you are familiar with maven you shouldn't have problems with the project folder structure. If not, you can found maven tutorials anyplace :P
At this moment, you will have to revise the code yourself as there is no technical documentation.

## How to generate JSDoc and minified version of rock.game.js

Open the terminal and execute:
```Batchfile
mvn clean compile jstools:jsdoc
```