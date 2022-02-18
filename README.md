[![Netlify Status](https://api.netlify.com/api/v1/badges/14e7ef42-5c90-44c8-a7ec-0b6e20c59735/deploy-status)](https://pixi-typescript-boilerplate.netlify.com) ![Windows build](https://github.com/jkanchelov/pixi-typescript-boilerplate/workflows/Windows%20build/badge.svg?branch=master) ![Linux build](https://github.com/jkanchelov/pixi-typescript-boilerplate/workflows/Linux%20build/badge.svg) ![MacOs build](https://github.com/jkanchelov/pixi-typescript-boilerplate/workflows/MacOs%20build/badge.svg)

Example of breaking cacheAsBitmap functionality when adding single container into @pixi/layers group.
If children of the container are also added to groups, cacheAsBitmap is working properly.

In this example, when opened, the circles has no assigned groups, only the container has, in which case when cacheAsBitmap is set to true, the two circles disappear.
When "Add / Remove circles to groups" button is pressed, the circles are added to groups and the cacheAsBitmap property starts working properly.
