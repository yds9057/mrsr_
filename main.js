/**
 * Created by YOON on 15. 7. 29..
 */


var fs = require('fs');
var _ = require('underscore');

var profileTable = {
    'start':{
        vmSmall: 0,
        vmMedium: 0,
        vmLarge: 0,
        vmXLarge: 0
    },
    'end':{
        vmSmall: 0,
        vmMedium: 0,
        vmLarge: 0,
        vmXLarge: 0
    },
    'm105ProjExec': {
        vmSmall: 244.16,
        vmMedium: 169.72,
        vmLarge: 143.62,
        vmXLarge: 123
    },
    'm105Add': {
        vmSmall: 215.02,
        vmMedium: 115.86,
        vmLarge: 28.94,
        vmXLarge: 14.12
    },
    'm105JPEG': {
        vmSmall: 34.88,
        vmMedium: 25.42,
        vmLarge: 8.02,
        vmXLarge: 4.7
    },
    'm106ProjExec': {
        vmSmall: 347.6,
        vmMedium: 166.36,
        vmLarge: 150.96,
        vmXLarge: 102.02
    },
    'm106Add': {
        vmSmall: 316.06,
        vmMedium: 170.28,
        vmLarge: 66.68,
        vmXLarge: 21.94
    },
    'm106JPEG': {
        vmSmall: 36.96,
        vmMedium: 33.72,
        vmLarge: 9.14,
        vmXLarge: 8.78
    },
    'm108ProjExec': {
        vmSmall: 350.58,
        vmMedium: 226.56,
        vmLarge: 161.46,
        vmXLarge: 106.4
    },
    'm108Add': {
        vmSmall: 319.38,
        vmMedium: 167.44,
        vmLarge: 109.68,
        vmXLarge: 44.32
    },
    'm108JPEG': {
        vmSmall: 53.04,
        vmMedium: 39.82,
        vmLarge: 22.54,
        vmXLarge: 14.64
    },
    'm105ProjExecm106ProjExec': {
        'm105ProjExec': {
            vmSmall: 451.72,
            vmMedium: 435.82,
            vmLarge: 276.7,
            vmXLarge: 249.24
        },
        'm106ProjExec': {
            vmSmall: 473.14,
            vmMedium: 387.44,
            vmLarge: 322.62,
            vmXLarge: 316.98
        }
    },
    'm105ProjExecm108ProjExec': {
        'm105ProjExec': {
            vmSmall: 445.44,
            vmMedium: 255.08,
            vmLarge: 235.5,
            vmXLarge: 148.32
        },
        'm108ProjExec': {
            vmSmall: 464.68,
            vmMedium: 323.44,
            vmLarge: 310.64,
            vmXLarge: 203.86
        }
    },
    'm106ProjExecm108ProjExec': {
        'm106ProjExec': {
            vmSmall: 465.12,
            vmMedium: 313.12,
            vmLarge: 295,
            vmXLarge: 287.7
        },
        'm108ProjExec': {
            vmSmall: 447.4,
            vmMedium: 296.86,
            vmLarge: 284.76,
            vmXLarge: 267.24
        }
    },
    'm105Addm106Add': {
        'm105Add': {
            vmSmall: 548.5,
            vmMedium: 266.8,
            vmLarge: 204.86,
            vmXLarge: 60.56
        },
        'm106Add': {
            vmSmall: 412.68,
            vmMedium: 369.42,
            vmLarge: 190.04,
            vmXLarge: 73.96
        }
    },
    'm105Addm108Add': {
        'm105Add': {
            vmSmall: 558.9,
            vmMedium: 298.3,
            vmLarge: 153.5,
            vmXLarge: 60.22
        },
        'm108Add': {
            vmSmall: 527.86,
            vmMedium: 478.2,
            vmLarge: 200.66,
            vmXLarge: 86.32
        }
    },
    'm106Addm108Add': {
        'm106Add': {
            vmSmall: 435.48,
            vmMedium: 433.7,
            vmLarge: 219.4,
            vmXLarge: 111.86
        },
        'm108Add': {
            vmSmall: 531.9,
            vmMedium: 506.56,
            vmLarge: 244.36,
            vmXLarge: 102.18
        }
    },
    'm105JPEGm106JPEG': {
        'm105JPEG': {
            vmSmall: 94.96,
            vmMedium: 81.34,
            vmLarge: 53.08,
            vmXLarge: 13.46
        },
        'm106JPEG': {
            vmSmall: 147.64,
            vmMedium: 84.74,
            vmLarge: 50.56,
            vmXLarge: 14.28
        }
    },
    'm105JPEGm108JPEG': {
        'm105JPEG': {
            vmSmall: 107.24,
            vmMedium: 91.72,
            vmLarge: 53.14,
            vmXLarge: 8.16
        },
        'm108JPEG': {
            vmSmall: 140.12,
            vmMedium: 91.24,
            vmLarge: 28.54,
            vmXLarge: 7.38
        }
    },
    'm106JPEGm108JPEG': {
        'm106JPEG': {
            vmSmall: 156.28,
            vmMedium: 100.64,
            vmLarge: 69.06,
            vmXLarge: 8.2
        },
        'm108JPEG': {
            vmSmall: 120.46,
            vmMedium: 105.88,
            vmLarge: 70.52,
            vmXLarge: 9.76
        }
    }
}
var VMcost = { //초당 비용
    vmSmall: 10,
    vmMedium: 20,
    vmLarge: 40,
    vmXLarge: 80
}
var VMs = {
    S1: {
        vmType: 'vmSmall'
    },
    S2: {
        vmType: 'vmSmall'
    },
    S3: {
        vmType: 'vmSmall'
    },
    S4: {
        vmType: 'vmSmall'
    },
    S5: {
        vmType: 'vmSmall'
    },
    S6: {
        vmType: 'vmSmall'
    },
    S7: {
        vmType: 'vmSmall'
    },
    S8: {
        vmType: 'vmSmall'
    },
    M1: {
        vmType: 'vmMedium'
    },
    M2: {
        vmType: 'vmMedium'
    },
    M3: {
        vmType: 'vmMedium'
    },
    M4: {
        vmType: 'vmMedium'
    },
    M5: {
        vmType: 'vmMedium'
    },
    M6: {
        vmType: 'vmMedium'
    },
    L1: {
        vmType: 'vmLarge'
    },
    L2: {
        vmType: 'vmLarge'
    },
    L3: {
        vmType: 'vmLarge'
    },
    L4: {
        vmType: 'vmLarge'
    },
    X1: {
        vmType: 'vmXLarge'
    },
    X1: {
        vmType: 'vmXLarge'
    }
}
var wf1, wf2, wf3, wf1Start, wf2Start, wf3Start, deadline, budget, gainlossInfo, startTime;

fs.readFile('./workflow1.json', 'utf8', function(err, json) {
    console.log('----------wf1----------');
    wf1 = preProcess(json);
    wf1Start = getStartInstance(wf1);
    deadline = 400;
    budget = 20000;
    startTime = 0;
    gainlossInfo = gainAlgorithm(wf1, wf1Start, budget);
    MRSR(wf1, wf1Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
    gainlossInfo = lossAlgorithm(wf1, wf1Start, budget);
    MRSR(wf1, wf1Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
});

fs.readFile('./workflow2.json', 'utf8', function(err, json) {
    console.log('----------wf2----------');
    wf2 = preProcess(json);
    wf2Start = getStartInstance(wf2);
    deadline = 658;
    budget = 45000;
    startTime = 0;
    gainlossInfo = gainAlgorithm(wf2, wf2Start, budget);
    MRSR(wf2, wf2Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
    gainlossInfo = lossAlgorithm(wf2, wf2Start, budget);
    MRSR(wf2, wf2Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
});

fs.readFile('./workflow3.json', 'utf8', function(err, json) {
    console.log('----------wf3----------');
    wf3 = preProcess(json);
    wf3Start = getStartInstance(wf3);
    deadline = 855;
    budget = 50000;
    startTime = 0;
    gainlossInfo = gainAlgorithm(wf3, wf3Start, budget);
    MRSR(wf3, wf3Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
    gainlossInfo = lossAlgorithm(wf3, wf3Start, budget);
    MRSR(wf3, wf3Start, gainlossInfo[0], gainlossInfo[1], startTime, deadline);
});


function preProcess(json) {
    //console.log(json);
    var workflow = JSON.parse(json);

    workflow.serviceInstances = JSON.parse(workflow.serviceInstances);
    workflow.links = JSON.parse(workflow.links);
    workflow.tempCost = 0;
    workflow.cost = 0;

    var instances = [];
    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].next = [];
        workflow.serviceInstances[index].prev = [];
        instances[workflow.serviceInstances[index].id] = workflow.serviceInstances[index];
        delete workflow.serviceInstances[index].x;
        delete workflow.serviceInstances[index].y;
        delete workflow.serviceInstances[index].id;
        delete workflow.serviceInstances[index].desc;
        delete workflow.serviceInstances[index].type;
        delete workflow.serviceInstances[index].output_interface_list;
        delete workflow.serviceInstances[index].input_interface_list;
        delete workflow.serviceInstances[index].operation;
        delete workflow.serviceInstances[index].version;
        workflow.serviceInstances[index].visited = false;
        workflow.serviceInstances[index].VMtype = '';
        workflow.serviceInstances[index].allocVM = {};
        workflow.serviceInstances[index].candidate = false;
        workflow.serviceInstances[index].alreadyChosen = 0;
        workflow.serviceInstances[index].startTime = 0;
        workflow.serviceInstances[index].endTime = 0;
        workflow.serviceInstances[index].executionTime = 0;
        workflow.serviceInstances[index].mergedExecutionTime = 0;
        workflow.serviceInstances[index].mergeCandidate = false;
        workflow.serviceInstances[index].merged = null;
    }

    for (var index in workflow.links) {
        var toServiceInstance = instances[workflow.links[index].toInstance];
        var fromServiceInstance = instances[workflow.links[index].fromInstance];
        instances[workflow.links[index].toInstance].prev.push(fromServiceInstance);
        instances[workflow.links[index].fromInstance].next.push(toServiceInstance);
    }

    return workflow;
}

function getStartInstance (workflow) {
    for (var index in workflow.serviceInstances) {
        if (workflow.serviceInstances[index].name === 'start')
            return workflow.serviceInstances[index];
    }
}

function gainAlgorithm(workflow, startInstance, budget) {
    var gainWeight, bestGainWeight = 0, originalTime, originalCost, changeVM;
    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].VMtype = '';
        workflow.serviceInstances[index].visited = false;
        workflow.serviceInstances[index].alreadyChosen = 0;
    }
    var totalPathSet = [];
    calcCost('vmSmall', startInstance, workflow, totalPathSet, [startInstance]); //vmSmall로 다 배치한 후, cost 계산
    workflow.cost = workflow.tempCost;
    workflow.tempCost = 0;
    //console.log(totalPathSet);
    var execTime = calcTime(totalPathSet);
    console.log('gainInitialExecTime: '+execTime);
    console.log('gainInitialTotalCost: '+workflow.cost);

    if (workflow.cost > budget) {
        console.log('gainExecTime: '+execTime);
        console.log('gainTotalCost: '+workflow.cost);
        return [execTime, workflow.cost];
    }

    while (true) {
        originalTime = execTime;
        originalCost = workflow.cost;
        for (var index in workflow.serviceInstances) {
            if (workflow.serviceInstances[index].name == 'start' || workflow.serviceInstances[index].name == 'end' || workflow.serviceInstances[index].alreadyChosen == 3)
                continue;

            var tempVMtype = workflow.serviceInstances[index].VMtype;

            if (workflow.serviceInstances[index].alreadyChosen == 0) {
                workflow.serviceInstances[index].VMtype = 'vmMedium';
                for (var index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                if (workflow.tempCost <= budget) {
                    var tempExecTime = calcTime(totalPathSet);

                    if (originalTime > tempExecTime) {
                        if (originalCost < workflow.tempCost)
                            gainWeight = (originalTime - tempExecTime) / (workflow.tempCost - originalCost);
                        else
                            gainWeight = (originalTime - tempExecTime); //비용 변화가 없거나 오히려 줄었을 경우, 식의 분모를 1로 함.

                        if (gainWeight > bestGainWeight) {
                            bestGainWeight = gainWeight;
                            for (var index3 in workflow.serviceInstances)
                                workflow.serviceInstances[index3].candidate = false;
                            workflow.serviceInstances[index].candidate = true;
                            changeVM = 'vmMedium';
                        }
                    }
                }
                workflow.tempCost = 0;
            }

            if (workflow.serviceInstances[index].alreadyChosen < 2) {
                workflow.serviceInstances[index].VMtype = 'vmLarge';
                for (var index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                if (workflow.tempCost <= budget) {
                    var tempExecTime = calcTime(totalPathSet);

                    if (originalTime > tempExecTime) {
                        if (originalCost < workflow.tempCost)
                            gainWeight = (originalTime - tempExecTime) / (workflow.tempCost - originalCost);
                        else
                            gainWeight = (originalTime - tempExecTime);

                        if (gainWeight > bestGainWeight) {
                            bestGainWeight = gainWeight;
                            for (var index3 in workflow.serviceInstances)
                                workflow.serviceInstances[index3].candidate = false;
                            workflow.serviceInstances[index].candidate = true;
                            changeVM = 'vmLarge';
                        }
                    }
                }
                workflow.tempCost = 0;
            }

            if (workflow.serviceInstances[index].alreadyChosen < 3) {
                workflow.serviceInstances[index].VMtype = 'vmXLarge';
                for (index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                if (workflow.tempCost <= budget) {
                    var tempExecTime = calcTime(totalPathSet);

                    if (originalTime > tempExecTime) {
                        if (originalCost < workflow.tempCost)
                            gainWeight = (originalTime - tempExecTime) / (workflow.tempCost - originalCost);
                        else
                            gainWeight = (originalTime - tempExecTime);

                        if (gainWeight > bestGainWeight) {
                            bestGainWeight = gainWeight;
                            for (index3 in workflow.serviceInstances)
                                workflow.serviceInstances[index3].candidate = false;
                            workflow.serviceInstances[index].candidate = true;
                            changeVM = 'vmXLarge';
                        }
                    }
                }
                workflow.tempCost = 0;
            }

            workflow.serviceInstances[index].VMtype = tempVMtype;
        }

        for (index in workflow.serviceInstances) {
            if (workflow.serviceInstances[index].candidate == true) {
                workflow.serviceInstances[index].candidate = false;
                workflow.serviceInstances[index].VMtype = changeVM;
                workflow.serviceInstances[index].alreadyChosen++;
                break;
            }
        }

        for (index in workflow.serviceInstances) {
            workflow.serviceInstances[index].visited = false;
        }
        totalPathSet = [];
        calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
        workflow.cost = workflow.tempCost;
        workflow.tempCost = 0;
        execTime = calcTime(totalPathSet);

        if (bestGainWeight == 0) {
            console.log('gainExecTime: '+execTime);
            console.log('gainTotalCost: '+workflow.cost+'\n');
            return [execTime, workflow.cost];
        }
        else {
            bestGainWeight = 0;
        }
    }
}

function lossAlgorithm(workflow, startInstance, budget) {
    var lossWeight, bestLossWeight = 0, originalTime, originalCost, changeVM;
    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].VMtype = '';
        workflow.serviceInstances[index].visited = false;
        workflow.serviceInstances[index].alreadyChosen = 0;
    }
    var totalPathSet = [];
    calcCost('vmXLarge', startInstance, workflow, totalPathSet, [startInstance]); //vmXLarge로 다 배치한 후, cost 계산
    workflow.cost = workflow.tempCost;
    workflow.tempCost = 0;
    var execTime = calcTime(totalPathSet);
    console.log('lossInitialExecTime: '+execTime);
    console.log('lossInitialTotalCost: '+workflow.cost);

    if (workflow.cost <= budget) {
        console.log('lossExecTime: '+execTime);
        console.log('lossTotalCost: '+workflow.cost);
        return [execTime, workflow.cost];
    }

    while (true) {
        originalTime = execTime;
        originalCost = workflow.cost;
        for (var index in workflow.serviceInstances) {
            if (workflow.serviceInstances[index].name == 'start' || workflow.serviceInstances[index].name == 'end' || workflow.serviceInstances[index].alreadyChosen == 3)
                continue;

            var tempVMtype = workflow.serviceInstances[index].VMtype;

            if (workflow.serviceInstances[index].alreadyChosen == 0) {
                workflow.serviceInstances[index].VMtype = 'vmLarge';
                for (var index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                var tempExecTime = calcTime(totalPathSet);

                if (originalCost >= workflow.tempCost) {
                    if (originalTime < tempExecTime)
                        lossWeight = (originalCost - workflow.tempCost) / (tempExecTime - originalTime);    // 논문 식에서의 역수(동기형 코드 참고)
                    else
                        lossWeight = (originalCost - workflow.tempCost); // 시간 변화가 없거나 오히려 줄었을 경우, 식의 분모를 1로 함.

                    if (lossWeight > bestLossWeight) {
                        bestLossWeight = lossWeight;
                        for (var index3 in workflow.serviceInstances)
                            workflow.serviceInstances[index3].candidate = false;
                        workflow.serviceInstances[index].candidate = true;
                        changeVM = 'vmLarge';
                    }
                }
                workflow.tempCost = 0;
            }

            if (workflow.serviceInstances[index].alreadyChosen < 2) {
                workflow.serviceInstances[index].VMtype = 'vmMedium';
                for (var index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                var tempExecTime = calcTime(totalPathSet);

                if (originalCost >= workflow.tempCost) {
                    if (originalTime < tempExecTime)
                        lossWeight = (originalCost - workflow.tempCost) / (tempExecTime - originalTime);
                    else
                        lossWeight = (originalCost - workflow.tempCost);

                    if (lossWeight > bestLossWeight) {
                        bestLossWeight = lossWeight;
                        for (var index3 in workflow.serviceInstances)
                            workflow.serviceInstances[index3].candidate = false;
                        workflow.serviceInstances[index].candidate = true;
                        changeVM = 'vmMedium';
                    }
                }
                workflow.tempCost = 0;
            }

            if (workflow.serviceInstances[index].alreadyChosen < 3) {
                workflow.serviceInstances[index].VMtype = 'vmSmall';
                for (index2 in workflow.serviceInstances) {
                    workflow.serviceInstances[index2].visited = false;
                }
                totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                var tempExecTime = calcTime(totalPathSet);

                if (originalCost >= workflow.tempCost) {
                    if (originalTime < tempExecTime)
                        lossWeight = (originalCost - workflow.tempCost) / (tempExecTime - originalTime);
                    else
                        lossWeight = (originalCost - workflow.tempCost);

                    if (lossWeight > bestLossWeight) {
                        bestLossWeight = lossWeight;
                        for (var index3 in workflow.serviceInstances)
                            workflow.serviceInstances[index3].candidate = false;
                        workflow.serviceInstances[index].candidate = true;
                        changeVM = 'vmSmall';
                    }
                }
                workflow.tempCost = 0;
            }

            workflow.serviceInstances[index].VMtype = tempVMtype;
        }

        for (index in workflow.serviceInstances) {
            if (workflow.serviceInstances[index].candidate == true) {
                workflow.serviceInstances[index].candidate = false;
                workflow.serviceInstances[index].VMtype = changeVM;
                workflow.serviceInstances[index].alreadyChosen++;
                break;
            }
        }

        for (index in workflow.serviceInstances) {
            workflow.serviceInstances[index].visited = false;
        }
        totalPathSet = [];
        calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
        workflow.cost = workflow.tempCost;
        workflow.tempCost = 0;
        execTime = calcTime(totalPathSet);

        if (bestLossWeight == 0 || workflow.cost < budget) {
            console.log('lossExecTime: '+execTime);
            console.log('lossTotalCost: '+workflow.cost+'\n');
            return [execTime, workflow.cost];
        }
        else {
            bestLossWeight = 0;
        }
    }
}

function MRSR(workflow, startInstance, execTime, cost, startTime, deadline) {
    if (execTime >= deadline) {
        console.log('MRSRExecTime: '+execTime);
        console.log('MRSRTotalCost: '+cost);
        return;
    }

    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].startTime = startTime;
        workflow.serviceInstances[index].executionTime = profileTable[workflow.serviceInstances[index].name][workflow.serviceInstances[index].VMtype];
    }

    var takenMergedName;

    for (var index in workflow.serviceInstances) {
        if (workflow.serviceInstances[index].merged != null)
            continue;

        getTaskTime (startInstance, workflow, startTime);

        var maxOverlapped = 0;
        var name1 = workflow.serviceInstances[index].name;

        for (var index2 in workflow.serviceInstances) {
            if ((workflow.serviceInstances[index] == workflow.serviceInstances[index2]) || workflow.serviceInstances[index2].merged != null)
                continue;

            var name2 = workflow.serviceInstances[index2].name;
            if (name2 != name1 && name2.substring(4, 8) == name1.substring(4, 8)
                && workflow.serviceInstances[index2].startTime <= workflow.serviceInstances[index].startTime
                && workflow.serviceInstances[index2].endTime > workflow.serviceInstances[index].startTime) {

                var tempOverlapped, mergedName;
                if (parseInt(name1.substring(1, 4)) < parseInt(name2.substring(1, 4)))
                    mergedName = name1 + name2;
                else
                    mergedName = name2 + name1;

                if (workflow.serviceInstances[index2].endTime >= workflow.serviceInstances[index].endTime)
                    tempOverlapped = workflow.serviceInstances[index].endTime - workflow.serviceInstances[index].startTime;
                else
                    tempOverlapped = workflow.serviceInstances[index2].endTime - workflow.serviceInstances[index].startTime;

                for (var index3 in workflow.serviceInstances) {
                    if (workflow.serviceInstances[index3].merged == null)
                        workflow.serviceInstances[index3].executionTime = profileTable[workflow.serviceInstances[index3].name][workflow.serviceInstances[index3].VMtype];
                }
                workflow.serviceInstances[index].executionTime = ((tempOverlapped / workflow.serviceInstances[index].executionTime) * profileTable[mergedName][workflow.serviceInstances[index].name][workflow.serviceInstances[index2].VMtype]) + (workflow.serviceInstances[index].executionTime - tempOverlapped);
                workflow.serviceInstances[index2].executionTime = ((tempOverlapped / workflow.serviceInstances[index2].executionTime) * profileTable[mergedName][workflow.serviceInstances[index2].name][workflow.serviceInstances[index2].VMtype]) + (workflow.serviceInstances[index2].executionTime - tempOverlapped);

                var totalPathSet = [];
                calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
                if (calcTime(totalPathSet, true) <= deadline && tempOverlapped > maxOverlapped) {
                    for (var index4 in workflow.serviceInstances) {
                        workflow.serviceInstances[index4].mergeCandidate = false;

                        if (workflow.serviceInstances[index4].merged == null)
                            workflow.serviceInstances[index4].executionTime = profileTable[workflow.serviceInstances[index4].name][workflow.serviceInstances[index4].VMtype];
                        }
                    }

                    workflow.serviceInstances[index2].mergeCandidate = true;
                    workflow.serviceInstances[index2].mergedExecutionTime = workflow.serviceInstances[index2].executionTime;
                    workflow.serviceInstances[index].mergedExecutionTime = workflow.serviceInstances[index].executionTime;
                    maxOverlapped = tempOverlapped;
                    takenMergedName = mergedName;
                }
                else {
                    workflow.serviceInstances[index].executionTime = profileTable[workflow.serviceInstances[index].name][workflow.serviceInstances[index].VMtype];
                    workflow.serviceInstances[index2].executionTime = profileTable[workflow.serviceInstances[index2].name][workflow.serviceInstances[index2].VMtype];
                }
            }
        }

        for (var index3 in workflow.serviceInstances) {
            if (workflow.serviceInstances[index3].mergeCandidate == true) {
                workflow.serviceInstances[index3].mergeCandidate = false;
                workflow.serviceInstances[index3].merged = takenMergedName;
                workflow.serviceInstances[index].merged = takenMergedName;
                workflow.serviceInstances[index3].executionTime = workflow.serviceInstances[index3].mergedExecutionTime;
                workflow.serviceInstances[index].executionTime = workflow.serviceInstances[index].mergedExecutionTime;
                workflow.serviceInstances[index].VMtype = workflow.serviceInstances[index3].VMtype;
            }
            else if (workflow.serviceInstances[index3].merged == null)
                workflow.serviceInstances[index3].executionTime = profileTable[workflow.serviceInstances[index3].name][workflow.serviceInstances[index3].VMtype];
        }
    }

    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].visited = false;
    }

    var totalPathSet = [];
    calcCost(null, startInstance, workflow, totalPathSet, [startInstance]);
    workflow.cost = workflow.tempCost;
    workflow.tempCost = 0;
    var execTime = calcTime(totalPathSet, true);

    console.log('MRSRExecTime: '+execTime);
    console.log('MRSRTotalCost: '+workflow.cost+'\n');

    for (var index in workflow.serviceInstances) {
        workflow.serviceInstances[index].merged = null;
    }
}

function getTaskTime (node, workflow, startTime) {
    if (startTime > node.startTime) {
        node.startTime = startTime;
    }

    node.endTime = node.startTime + node.executionTime;
    startTime = node.endTime;

    for (var index in node.next) {
        getTaskTime (node.next[index], workflow, startTime);
    }
}

function calcCost(VMtype, node, workflow, totalPathSet, pathSet) {
    if (node.visited == false) {
        if (!node.VMtype) {
            node.VMtype = VMtype;
        }
        //console.log(node.name + ': ' + node.VMtype);
        //workflow.time += profileTable[node.name][node.VMtype];

        if (node.merged != null)
            workflow.tempCost += (VMcost[node.VMtype] * node.executionTime);
        else
            workflow.tempCost += (VMcost[node.VMtype] * profileTable[node.name][node.VMtype]);

        node.visited = true;
    }

    if (node.name == 'end') {
        var temp = _.clone(pathSet);
        totalPathSet.push(temp);
    }

    for (var index in node.next) {
        pathSet.push(node.next[index]);
        calcCost(VMtype, node.next[index], workflow, totalPathSet, pathSet);
        pathSet.pop();
    }
}

function calcTime(totalPathSet, gotExecTime) {
    var maxTime = 0;
    for (var index in totalPathSet) {
        var time = 0;
        for (var index2 in totalPathSet[index]) {
            if (gotExecTime != true)
                time += profileTable[totalPathSet[index][index2].name][totalPathSet[index][index2].VMtype];
            else
                time += totalPathSet[index][index2].executionTime;
        }
        if (time > maxTime) {
            maxTime = time;
        }
    }
    return maxTime;
}