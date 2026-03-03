import fs from "fs";
import path from "path";

const tpl = (name: string): string =>
  fs.readFileSync(path.join(__dirname, "_templates", name), "utf-8");

export const AGENT_INIT_SKILL = tpl("agent-init.skill.md");
export const AGENT_INIT_WORKFLOW = tpl("agent-init.workflow.md");

export const ADD_SKILL_SKILL_TEMPLATE = tpl("add-skill.skill.md");
export const ADD_SKILL_WORKFLOW_TEMPLATE = tpl("add-skill.workflow.md");

export const ADD_SPEC_SKILL_TEMPLATE = tpl("add-spec.skill.md");
export const ADD_SPEC_WORKFLOW_TEMPLATE = tpl("add-spec.workflow.md");

export const AGENTS_MD_SPECIALIST_SKILL = tpl("agents-md-specialist.skill.md");
export const CLAUDE_MD_SPECIALIST_SKILL = tpl("claude-md-specialist.skill.md");
export const AGENTS_CLAUDE_SYNC_WORKFLOW = tpl("agents-claude-sync.workflow.md");
