const axios = require('axios').default;
const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {

    profile: {
        view: function(username, platform){ // Get entire response from the Profile
            let user = username.replace("#", "%23");
            return new Promise((resolve, reject) => {
                axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${user}/profile/type/mp`)
                .then(data => {
                    const res = data.data.data;
                    resolve(res);
                }).catch(e => reject(e));
            });
        },

        get: function(username, platform){ // Get compact view of all-time Profile Stats
            var response = [];
            let user = username.replace("#", "%23");
            return new Promise((resolve, reject) => {
                axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${user}/profile/type/mp`)
                .then(data => {
                    const res = data.data.data;
                    const all = res.lifetime.all.properties;
                    response.push({
                        username: res.username,
                        level: res.level,
                        totalXp: res.totalXp,
                        hoursPlayed: `${Math.round(all.timePlayedTotal / 3600)} hours`,
                        gamesPlayed: all.totalGamesPlayed,
                        kills: all.kills,
                        deaths: all.deaths,
                        kd: Math.round((all.kdRatio + Number.EPSILON) * 100) / 100,
                        wins: all.wins,
                        losses: all.losses
                    });
                    resolve(response[0]);
                }).catch(e => reject(e));
            });
        },
        
        getFull: function(username, platform){ // Get full view of all-time Profile Stats
            let user = username.replace("#", "%23");
            return new Promise((resolve, reject) => {
                axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${user}/profile/type/mp`)
                .then(data => {
                    const res = data.data.data.lifetime.all.properties;
                    resolve(res);
                }).catch(e => reject(e));
            });
        },

        getMode: function(username, platform, mode){ // Get full view of Mode-Specific Stats
            let user = username.replace("#", "%23");
            return new Promise((resolve, reject) =>{
                axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${user}/profile/type/mp`).then(data => {
                    const res = data.data.data.lifetime.mode;
                    switch(mode){
                        case "dom"     : resolve(res.dom.properties);
                        case "war"     : resolve(res.war.properties);
                        case "hq"      : resolve(res.hq.properties);
                        case "hc_dom"  : resolve(res.hc_dom.properties);
                        case "hc_conf" : resolve(res.hc_conf.properties);
                        case "koth"    : resolve(res.koth.properties);
                        case "conf"    : resolve(res.conf.properties);
                        case "hc_hq"   : resolve(res.hc_hq.properties);
                        case "br_dmz"  : resolve(res.br_dmz.properties);
                        case "br"      : resolve(res.br.properties);
                        case "sd"      : resolve(res.br.properties);
                        case "cyber"   : resolve(res.cyber.properties);
                        case "hc_war"  : resolve(res.hc_war.properties);
                        case "br_all"  : resolve(res.br_all.properties);
                        case "hc_sd"   : resolve(res.hc_sd.properties);
                        case "hc_cyber": resolve(res.hc_cyber.properties);
                    }
                }).catch(e => reject(e));
            })
        }
    },

    leaderboard: {
        pc: {
            kills: function(){ // Get Top 100 Kills on PC
                const url = "https://cod.tracker.gg/modern-warfare/leaderboards/stats/battlenet/Kills?page=1";
                return new Promise((resolve, reject) => {
                    rp(url)
                    .then(html => {
                        const names = [];
                        const kills = [];
                        const matches = [];
                        const result = [];
                        $('div.board td.username span', html).each(function(i, elem){
                            names[i] = $(this).text();
                        });
                        $('div.board td.region + td.stat', html).each(function(i, elem){
                            kills[i] = $(this).text();
                        });
                        $('div.board td.stat + td.collapse', html).each(function(i, elem){
                            matches[i] = $(this).text();
                        });
                        for (i = 0; i < names.length; i++) {
                            result.push({
                                name: names[i],
                                kills: kills[i],
                                matches: matches[i]
                            });
                        }
                        resolve(result)
                    });
                });
            }
        },
        psn: {
            kills: function(){ // Get Top 100 Kills on Playstation
                const url = "https://cod.tracker.gg/modern-warfare/leaderboards/stats/psn/Kills?page=1";
                return new Promise((resolve, reject) => {
                    rp(url)
                    .then(html => {
                        const names = [];
                        const kills = [];
                        const matches = [];
                        const result = [];
                        $('div.board td.username span', html).each(function(i, elem){
                            names[i] = $(this).text();
                        });
                        $('div.board td.region + td.stat', html).each(function(i, elem){
                            kills[i] = $(this).text();
                        });
                        $('div.board td.stat + td.collapse', html).each(function(i, elem){
                            matches[i] = $(this).text();
                        });
                        for (i = 0; i < names.length; i++) {
                            result.push({
                                name: names[i],
                                kills: kills[i],
                                matches: matches[i]
                            });
                        }
                        resolve(result)
                    });
                });
            }
        },
        xbl: {
            kills: function(){ // Get Top 100 Kills on XBOX
                const url = "https://cod.tracker.gg/modern-warfare/leaderboards/stats/xbl/Kills?page=1";
                return new Promise((resolve, reject) => {
                    rp(url)
                    .then(html => {
                        const names = [];
                        const kills = [];
                        const matches = [];
                        const result = [];
                        $('div.board td.username span', html).each(function(i, elem){
                            names[i] = $(this).text();
                        });
                        $('div.board td.region + td.stat', html).each(function(i, elem){
                            kills[i] = $(this).text();
                        });
                        $('div.board td.stat + td.collapse', html).each(function(i, elem){
                            matches[i] = $(this).text();
                        });
                        for (i = 0; i < names.length; i++) {
                            result.push({
                                name: names[i],
                                kills: kills[i],
                                matches: matches[i]
                            });
                        }
                        resolve(result)
                    });
                });
            }
        }
    }
}
