import ApplicationController from "./app/ApplicationController";

function main()
{
    const applicationController = new ApplicationController();
    applicationController.view.placeAt(document.body);
    applicationController.run();
}

window.$ = $;
$(main);
