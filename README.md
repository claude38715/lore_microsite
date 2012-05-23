Update: Updated to use CoffeeScript idioms courtesy of @michaelficarra - see [#1](https://github.com/coursekit/lore_microsite/pull/1) for a detailed discussion on the various style descisions.
Lore Microsite
=============
A fancy microsite to announce our transition from Coursekit to Lore. View it live at http://lore.com/story

Lore is hiring awesome people to build awesome things. [Join us](http://lore.com/jobs)

Code Notes
--------------

The entire source is in src/animation.coffee. Given the explanation below, it should be pretty easy to follow.

A "page" of the animation consists of a list of `shapes` and a text blob.

A `shape` is a list of dictionaries of the form `{get_points: (time, dtim, elapsed_time) -> ...}`, where time is the time the current frame was triggered, dtim is the time since the last time a frame was rendered, and elapsed_time is the time elapsed since the current page was rendered. 

Calling `get_points` must return a list of `points`, where a `point` is a dictionary of the form:

```coffeescript
    position: # The position on the screen
        x: ...
        y: ...
    color: [red, green, blue] # The displayed color
    radius: ... # The displayed radius
    background_image: # Show an image on the dot - null to show a solid color instead
        image: ... # A url to an image file
        position:  # The position of the background image on the screen
            x: ...
            y: ...
        scale: ... #the size of the image
   opacity: ... # The displayed opacity 
   outer_opacity: ... # Opacity of the outer ring
   outer_padding: ... # Size of the outer ring
   z_index: ... # The z-index for the dot
   absolute: true/false # Force the dot to immediately appear with this format, instead of animating
   immediate: [fields] # A list of fields which should appear immediately, instead of animating
```

If a dot has a background image then it acts as a port hole to the image. Imagine the image being rendered at the position and scale specified. Any dot on top of that image shows the portion of the image that it is above. This is how the initial coursekit logo decomposes, and how the circle for the final Lore logo is rendered.

The outer_opacity and outer_padding allow you to specify an outer ring around the dot for a halo effect.

All size and position values are returned in the range [0...1], and scaled to the size of the screen at display timat display time.


From these values, the `dots` (what is actually visible on screen) are assigend to the nearest point. Dots are created or destroyed as necessary to match the requested number of points.

At each frame, get_points is called with the appropriate values. The result is used to assign the "goal" positions of each dot, and then the dots are animated towards their goal, and update their div on the screen.