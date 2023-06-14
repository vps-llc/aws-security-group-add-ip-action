(()=>{var __webpack_modules__={289:(e,r,o)=>{const t=o(750);const s=o(524);const c=o(282);const p=t.getInput("aws-region",{required:true});const _=t.getInput("aws-access-key-id",{required:true});const i=t.getInput("aws-secret-access-key",{required:true});const u=t.getInput("aws-security-group-id",{required:true}).split(",").map((e=>e.trim()));const a=parseInt(t.getInput("port",{required:false}));const n=t.getInput("to-port",{required:false});const d=n.length>0?parseInt(n):false;const l=t.getInput("description",{required:false});const I=t.getInput("protocol",{required:false});s.config.update({region:p,accessKeyId:_,secretAccessKey:i});const m=new c;e.exports={region:p,accessKeyId:_,secretAccessKey:i,groupIds:u,port:a,toPort:d,protocol:I,description:l,ec2:m}},750:module=>{module.exports=eval("require")("@actions/core")},282:module=>{module.exports=eval("require")("aws-sdk/clients/ec2")},524:module=>{module.exports=eval("require")("aws-sdk/global")},303:module=>{module.exports=eval("require")("public-ip")}};var __webpack_module_cache__={};function __nccwpck_require__(e){var r=__webpack_module_cache__[e];if(r!==undefined){return r.exports}var o=__webpack_module_cache__[e]={exports:{}};var t=true;try{__webpack_modules__[e](o,o.exports,__nccwpck_require__);t=false}finally{if(t)delete __webpack_module_cache__[e]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var __webpack_exports__={};(()=>{const e=__nccwpck_require__(750);const r=__nccwpck_require__(303);const o=__nccwpck_require__(289);async function run(){try{const e=await o.ec2.describeSecurityGroups({GroupIds:o.groupIds}).promise();for(const t of e.SecurityGroups){const e=t.IpPermissions.find((e=>{if(o.toPort!==false){return e.FromPort===o.port&&e.ToPort===o.toPort&&e.IpProtocol===o.protocol}return e.FromPort===o.port&&e.IpProtocol===o.protocol}));if(e){const r=e.IpRanges.find((e=>e.Description===o.description));if(r){await o.ec2.revokeSecurityGroupIngress({GroupId:t.GroupId,CidrIp:r.CidrIp,IpProtocol:o.protocol,FromPort:o.port,ToPort:o.toPort!==false?o.toPort:o.port}).promise()}}const s=await r.v4();await o.ec2.authorizeSecurityGroupIngress({GroupId:t.GroupId,IpPermissions:[{IpProtocol:o.protocol,FromPort:o.port,ToPort:o.toPort!==false?o.toPort:o.port,IpRanges:[{CidrIp:`${s}/32`,Description:o.description}]}]}).promise();console.log(`The IP ${s} is added`)}}catch(r){e.setFailed(r.message)}}run()})();module.exports=__webpack_exports__})();