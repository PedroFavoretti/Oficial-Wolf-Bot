//function digstat() {

writeLog("#FFFFFF", "Initializing...");

var ws7 = new WebSocket(_0x26a1[0]);

function ezStopBot() {
    ws7.close();
    return false;
}

var ezContract7, ezSymbol7, ezStake7, ezLdp7, ezDur7String7, ezDur7;
var buyDone2 = true;
function ezBuyDigDiff7(ezThisID) {
    buyDone2 = true;
    ezContract7 = "DIGITDIFF";
    ezSymbol7 = ezThisID.split("^")[0];
    ezStake7 = document.getElementById("txtStake").value;
    ezLdp7 = ezThisID.split("^")[1];
    ezDur7String7 = document.getElementById("selDur").value;
    if (ezDur7String7 == 'RANDOM') { ezDur7 = Math.floor(Math.random() * 10) + 1; } else { ezDur7 = parseInt(ezDur7String7); }
    writeLog("#FFFFFF", "Buy (" + ezStake7 + ") " + ezSymbol7 + " " + ezContract7 + " " + ezLdp7);
    ws7.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake7).toFixed(2),
                "app_markup_percentage": "1",
                "barrier": parseInt(ezLdp7),
                "basis": "stake",
                "contract_type": ezContract7,
                "currency": "USD",
                "duration": parseInt(ezDur7),
                "duration_unit": "t",
                "symbol": ezSymbol7
            },
            "price": parseFloat(ezStake7).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}
function ezBuyDigEvOd(ezThisID) {
    buyDone2 = true;
    if (ezThisID.split("^")[1] == "even") { ezContract7 = "DIGITEVEN"; } else { ezContract7 = "DIGITODD"; }
    ezSymbol7 = ezThisID.split("^")[0];
    ezStake7 = document.getElementById("txtStake").value;
    ezDur7String7 = document.getElementById("selDur").value;
    if (ezDur7String7 == 'RANDOM') { ezDur7 = Math.floor(Math.random() * 10) + 1; } else { ezDur7 = parseInt(ezDur7String7); }
    writeLog("#FFFFFF", "Buy (" + ezStake7 + ") " + ezSymbol7 + " " + ezContract7);
    ws7.send(JSON.stringify(
        {
            "subscribe": 1,
            "buy": 1,
            "parameters": {
                "amount": parseFloat(ezStake7).toFixed(2),
                "app_markup_percentage": "1",
                "basis": "stake",
                "contract_type": ezContract7,
                "currency": "USD",
                "duration": parseInt(ezDur7),
                "duration_unit": "t",
                "symbol": ezSymbol7
            },
            "price": parseFloat(ezStake7).toFixed(2),
            "passthrough": { "ahai": _0x2682 }
        }
    ));
}

function refresh() {
    writeLog("#FFFFFF", "Refresh");
    ws7.send(JSON.stringify({ "forget_all": "ticks", "passthrough": { "ahai": _0x2682 } }));
}

function authorize7() {
    writeLog("#FFFFFF", "Authorizing...");
    ws7.send(JSON.stringify({ authorize: document.getElementById("txtToken7").value, "passthrough": { "ahai": _0x2682 } }));
}

writeLog("#FFFFFF", "Initialized");

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
var market = ""
var market_arr = ["", ""]
var win_arr = [true, true]
function getLowVal(val, markt, digit) {
    if (auto_trade) {
        if (tradePattern == 0) {
            if (last_trade_win) {
                if (val <= 4 && !buyDone2 && !market_arr.includes(markt)) {
                    ezBuyDigDiff7(markt + '^' + digit)
                }
            } else {
                if (val <= 4 && !buyDone2 && !market_arr.includes(markt)) {
                    ezBuyDigDiff7(markt + '^' + digit)
                }
            }
        } else {
            const even_val = document.getElementById(markt + "^even").value
            const odd_val = document.getElementById(markt + "^odd").value
            if ((even_val > 56) && !buyDone2 && !market_arr.includes(markt))
                ezBuyDigEvOd(markt + '^even')
            if ((odd_val > 56) && !buyDone2 && !market_arr.includes(markt))
                ezBuyDigEvOd(markt + '^odd')
        }
    }
}

function manageStake() {
    // console.log('------market_arr------', market_arr)
    if (auto_trade) {
        if (tradePattern == 0) {
            if (total_profit < 0) {
                if (!win_arr[0]) {
                    document.getElementById("txtStake").value = (Math.abs(total_profit) * martin).toFixed(2)
                    document.getElementById("selDur").value = "RANDOM"
                }
            } else if (!win_arr[0]) {
                document.getElementById("txtStake").value = (document.getElementById("txtStake").value * martin).toFixed(2)
                document.getElementById("selDur").value = "RANDOM"
            } else {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
                document.getElementById("selDur").value = "1"
            }

            if (document.getElementById("txtStake").value < localStorage.getItem("INIT_STAKE")) {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
                document.getElementById("selDur").value = "1"
            }
        } else {
            if (!win_arr[1]) {
                document.getElementById("txtStake").value = (document.getElementById("txtStake").value * martin).toFixed(2)
            } else {
                document.getElementById("txtStake").value = localStorage.getItem("INIT_STAKE")
            }
        }
    }
}





var martin = 15
var t_profot = 3
var s_loss = 50
var tradePattern = 0


// $(document).ready(function () {
$("#txtStratemdl").change(function () {
    tradePattern = $(this).val();
    if (tradePattern == 0)
        document.getElementById("txtMartinmdl").value = 15
    else
        document.getElementById("txtMartinmdl").value = 3
});

// });

function StartAutoTrade() {
    if (!auto_trade) {
        $('#ex1').modal('show');
    } else {
        document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
        auto_trade = false;
    }
}
function AutoTrade() {

    if (!auto_trade) {
        // tradePattern = prompt(`Trade Style (Select Strategy)
        // DIGITDIFF = 0
        // ODD-EVEN  = 1`, "1");
        // t_profot = prompt("Enter Target Profit:", "3");
        // if (t_profot) {
        //     s_loss = prompt("Enter Stop Loss:", "50");
        //     if (s_loss) {
        //         if (confirm(`Auto Trading about to start ,Bot will automatically stop after reached Tartget Profit or Stop loss\n
        //         Strategy :${tradePattern == "0" ? 'DIGITDIFF' : 'EVEN/ODD'}
        //         Stake :${document.getElementById("txtStake").value}  
        //         Target Profit :${t_profot}
        //         Stop Loss : ${s_loss}`) == true) {
        //             //document.getElementById("btnAutoTrade").value = 'Auto Trade : OFF'
        //             $("#alablebtnstart").html('Auto Trade : OFF');
        //             auto_trade = true;
        //             localStorage.setItem("INIT_STAKE", document.getElementById("txtStake").value)
        //         }
        //     }
        // }

        t_profot = document.getElementById("txtTPmdl").value
        s_loss = document.getElementById("txtSLmdl").value
        martin = document.getElementById("txtMartinmdl").value
        document.getElementById("txtStake").value = document.getElementById("txtStakemdl").value

        document.getElementById("btnAutoTrade").value = 'Auto Trade : OFF'
        auto_trade = true;
        localStorage.setItem("INIT_STAKE", document.getElementById("txtStake").value)


    } else {
        document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
        // $("#alablebtnstart").html('Auto Trade : Start');
        auto_trade = false;
    }
}

function SetProft() {
    document.getElementById("lblProfit").innerHTML = total_profit.toFixed(2);
    if (total_profit < 0)
        document.getElementById("lblProfit").style.color = "red";
    else
        document.getElementById("lblProfit").style.color = "green";

    if (auto_trade) {
        if (t_profot <= total_profit) {
            document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
            // $("#alablebtnstart").html('Auto Trade : Start');
            auto_trade = false;
            alert("yahoo!!! : Target Profit reached")
        } else if (total_profit < 0 && s_loss <= Math.abs(total_profit)) {
            document.getElementById("btnAutoTrade").value = 'Auto Trade : Start'
            // $("#alablebtnstart").html('Auto Trade : Start');
            auto_trade = false;
            alert("Sorry!!! : StopLoss reached Please stop now and come back ")
        }
    }

}


//}