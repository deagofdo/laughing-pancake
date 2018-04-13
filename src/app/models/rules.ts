import { subRule } from "./subRule";

export class rules {
  id: number;
  ruleCategory: string;
  language: string;
  group: string;  
  subGroup: string;  
  ruleType: string;
  desc: string;
  effortType: string;
  ruleParserType: string;
  enabled: string;  
  fileList: any;
  regexPreCondition: string;
  regexList: any;
  // subRules: Array<subRule>;
  subRulesInfoList: any[]|null;
  // subRules: {
  //   file: string;
  //   pattern: string;
  //   match: false;
  // }
}
