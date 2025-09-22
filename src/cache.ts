import { Cache, Config } from "./interfaces";
import * as YAML from "yaml";
import * as fs from "fs";
import 'dotenv/config';

const cache: Cache = {
  userId: "",
  ticketIDs: [],
  ticketStatus: {},
  ticketSent: [],
  html: "",
  noSound: "",
  markdown: "",
  io: {},
  config: {
    use_llm: false,
  } as Config,
};

// 1) читаем YAML (необязательно существующий)
let yamlConfig: Partial<Config> = {};
const raw = fs.readFileSync("./config/config.yaml", "utf8");
yamlConfig = YAML.parse(raw) ?? {};

// mongodb_uri; bot_token; staffchat_id; owner_id
cache.config = {
  ...yamlConfig,

  mongodb_uri:
    process.env.MONGODB_URI?.trim() || "",

  bot_token:
    process.env.BOT_TOKEN?.trim() || "",

  staffchat_id:
    process.env.STAFFCHAT_ID?.trim() || "",

  owner_id: process.env.OWNER_ID?.trim() || "",
} as Config;

export default cache;
