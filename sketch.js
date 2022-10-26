/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let ActiveObjects = [];
let ActiveButtons = [];
let ActiveScene = null;

let mainMenuScene;
let levelSelectionScene;
let settingsScene;

let level1Scene;
let level2Scene;
let level3Scene;
let level4Scene;

let InTransition = false;
let TransitionTimer = 1.0;
let screenCover;

let ActiveObjectsDirty = false;

function setup()
{
  angleMode(DEGREES);
  createCanvas(1920, 970);
  background(0);

  screenCover = new BaseObject(1920/2 - 90, 970/2-50);
  screenCover.AddComponent(new ImageComponent(screenCover, loadImage("Assets/Images/FadeGradient.png"), 100, 100));

  mainMenuScene = new MainMenuScene();
  levelSelectionScene = new LevelSelectionScene();
  settingsScene = new SettingsScene();

  level1Scene = new Level1Scene();
  level2Scene = new Level2Scene();
  level3Scene = new Level3Scene();
  level4Scene = new Level4Scene();

  LoadScene("MainMenu");
}

function draw() //this function runs the whole program
{
  SceneManagement();

  UpdateActiveObjects();

  CleanActiveObjects();
}

function CleanActiveObjects()
{
  if (ActiveObjectsDirty)
  {
    for (let i = 0; i < ActiveObjects.length; i++)
    {
      if (ActiveObjects[i].destroyed)
      {
        ActiveObjects.splice(i, 1);
        i--;
      }
    }

    ActiveObjectsDirty = false;
  }
}

function SceneManagement()
{
  if (InTransition)
  {
    if (ActiveScene != null)
    {
      SceneTransition(ActiveScene);
    }  
  } 
}

function UpdateActiveObjects()
{
  for (let i = 0; i < ActiveObjects.length; i++)
  {
    ParseGameEvents(ActiveObjects[i].UpdateComponents());   
  }
}

function ParseGameEvents(gameEvents)
{
  if (!InTransition)
  {
    for (let i = 0; i < gameEvents.length; i++)
    {
      if (gameEvents[i] == null || gameEvents[i] == "")
      {
        continue;
      }

      console.log(gameEvents[i]);
      if (gameEvents[i][0] == "load")
      {     
        LoadScene(gameEvents[i][1]);
      }
      if (gameEvents[i][0] == "create")
      {
        ActiveObjects.push(gameEvents[i][1]);
      }
      if (gameEvents[i][0] == "destroy")
      {
        gameEvents[i][1].destroyed = true;
        ActiveObjectsDirty = true;
      }
    }
  
  }
}


//event functions
function LoadScene(sceneName)
{
  console.log("Loading Scene: " + sceneName); 
  ActiveObjects = []
  ActiveButtons = []

  if (sceneName == "MainMenu")
  {
    ActiveScene = mainMenuScene;
  }
  else if (sceneName == "LevelSelection")
  {
    ActiveScene = levelSelectionScene;
  }
  else if (sceneName == "Level1")
  {
    ActiveScene = level1Scene;
  }
  else if (sceneName == "Level2")
  {
    ActiveScene = level2Scene;
  }
  else if (sceneName == "Level3")
  {
    ActiveScene = level3Scene;
  }
  else if (sceneName == "Level4")
  {
    ActiveScene = level4Scene;
  }
  else if (sceneName == "Settings")
  {
    ActiveScene = settingsScene;
  }
  else
  {
    return;
  }

  InTransition = true;
  TransitionTimer = .5;
  ActiveObjects.push(screenCover);
  console.log("Active Objects Count: " + ActiveObjects.length);
}

function SceneTransition(newScene)
{  
  if (TransitionTimer > 0)
  {
    TransitionTimer -= deltaTime / 1000.0;
    let val = deltaTime / 1000.0 * 25650;
    screenCover.GetComponent(0).width += val;
    screenCover.GetComponent(0).height += val;
    screenCover.x -= (val / 2.0);
    screenCover.y -= (val / 2.0);

    if (TransitionTimer < 0)
    {
      ActiveObjects = newScene.ActiveObjects;
      ActiveObjects.push(screenCover);
      console.log("Exited Fade Out");
    }
  }
  
  if (TransitionTimer < 0 && TransitionTimer > -.5)
  {
    TransitionTimer -= deltaTime / 1000.0;
    let val = deltaTime / 1000.0 * 25650;
    screenCover.GetComponent(0).width -= val;
    screenCover.GetComponent(0).height -= val;
    screenCover.x += (val / 2.0);
    screenCover.y += (val / 2.0);
  }
  if (TransitionTimer < -.5)
  {
    let ind = ActiveObjects.indexOf(screenCover);
    if (ind != -1)
    {
      ActiveObjects.splice(ind, 1);
    }
    
    InTransition = false;
  }
}