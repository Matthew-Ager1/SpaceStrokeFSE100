class MainMenuScene
{
    constructor()
    {
        this.ActiveObjects = [];
        this.CreateMainMenu();
    }

    CreateObject(x, y)
    {
        let temp = new BaseObject(x, y);
        this.ActiveObjects.push(temp);
        return temp;
    }

    CreateMainMenu()
    {
        this.ActiveObjects = [];

        let spaceBackground = loadImage("Assets/Images/MainMenu/MainMenuBackground.png");
        let titleImage =      loadImage("Assets/Images/MainMenu/TitleImage.png");
        let playButton =      loadImage("Assets/Images/MainMenu/EarthPlanet.png");
        let settingsButton =  loadImage("Assets/Images/MainMenu/Moon.png");

        let obj_spaceBackground = this.CreateObject(0, 0);
        obj_spaceBackground.AddComponent(new ImageComponent(obj_spaceBackground, spaceBackground, 1920, 970));

        let obj_title = this.CreateObject(300, 45);
        obj_title.AddComponent(new ImageComponent(obj_title, titleImage, 1300, 200));

        let obj_playButton = this.CreateObject(710, 250);
        obj_playButton.AddComponent(new ImageComponent(obj_playButton, playButton, 400, 400, .1, 200));
        obj_playButton.AddComponent(new ButtonComponent(obj_playButton, 400, 400, "load", "LevelSelection", 200));
        obj_playButton.AddComponent(new HoverMovement(obj_playButton, true, 260, 300, .05));
        obj_playButton.AddComponent(new HoverMovement(obj_playButton, false, 710, 710, 0));
        
        
        let obj_settingsButton = this.CreateObject(210, 350);
        obj_settingsButton.AddComponent(new ImageComponent(obj_settingsButton, settingsButton, 150, 150, .1, 75));
        obj_settingsButton.AddComponent(new ButtonComponent(obj_settingsButton, 150, 150, "load", "Settings", 150));
        obj_settingsButton.AddComponent(new HoverMovement(obj_settingsButton, true, 310, 450, .03));
        obj_settingsButton.AddComponent(new HoverMovement(obj_settingsButton, false, 120, 270, .08));
    }

    
}