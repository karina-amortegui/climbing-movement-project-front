# Post-MVP Backlog

Features and improvements identified during MVP development that are intentionally postponed until after launch.

## Home

### Dynamic Movement Spotlight

**MVP approach**
- Manually choose one existing movement to feature on the Home page.

**Post-MVP iteration**
- Load the featured movement from MongoDB.
- Decide how an administrator designates a movement as featured.
- Handle loading, empty, and error states.
- Consider extracting `MovementSpotlight` into its own component once it has its own data-fetching responsibility.