# Modern Warfare API Wrapper

## Features
- Profile Data
- Mode-Specific Data
- Global Leaderboards (Top 100)

## Install

```npm install --save mw-api-wrapper```

## Example

```javascript
const mw = require("mw-api-wrapper");

mw.profile.get("Saenai#2426", "battle").then((output) => {
    console.log(output);
});
```

## Profile Data
### mw.profile.view(username, platform)          // Entire Profile
### mw.profile.get(username, platform)           // Compact Profile Lifetime Stats
### mw.profile.getFull(username, platform)       // Full Profile Lifetime Stats
### mw.profile.getMode(username, platform, mode) // Get Stats for Mode
`username` - Username, including if applicable.

`platform` - `battle`, `psn` or `xbl`.

`mode` - `dom`, `war`, `hq`, `hc_dom`, `hc_conf`, `koth`, `conf`, `hc_hq`, `br_dmz`, `br`, `sd`, `cyber`, `hc_war`, `br_all`, `hc_sd` or `hc_cyber`.

## Global Leaderboards (Top 100) // Only Kills as of 0.0.5
### mw.leaderboard.`<platform>`()
`platform` - `pc`, `psn`, `xbl`.


