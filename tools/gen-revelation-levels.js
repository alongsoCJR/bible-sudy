#!/usr/bin/env node
/**
 * 从 src/static/bible_full.js 的 revelation 生成 22 章闯关数据（一节一关）。
 * 切块规则对齐启 1:1–3 模板：按中文标点切分，标点留在词块末尾，目标 2–6 块。
 *
 * 用法：
 *   node tools/gen-revelation-levels.js
 *   node tools/gen-revelation-levels.js --check
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const BIBLE_PATH = path.join(ROOT, "src/static/bible_full.js");
const OUT_JS = path.join(ROOT, "src/static/js/revelation-levels.js");
const OUT_JSON = path.join(ROOT, "tools/revelation-levels.json");

const CH_NAMES = [
  "第1章 耶稣基督的启示",
  "第2章 七教会书信（上）",
  "第3章 七教会书信（下）",
  "第4章 天上的宝座",
  "第5章 书卷与羔羊",
  "第6章 揭开六印",
  "第7章 十四万四千人",
  "第8章 第七印与七号",
  "第9章 五号六号之灾",
  "第10章 小书卷",
  "第11章 两个见证人",
  "第12章 妇人与龙",
  "第13章 海兽与地兽",
  "第14章 羔羊与收割",
  "第15章 末后七灾",
  "第16章 七碗之灾",
  "第17章 大淫妇巴比伦",
  "第18章 巴比伦倾倒",
  "第19章 羔羊婚筵",
  "第20章 千禧年",
  "第21章 新天新地",
  "第22章 主必快来"
];

const PUNCT = "，。；：、！？";

/** 按中文标点切分，标点归前一块（对齐启1:1–3） */
function splitByPunct(raw) {
  const parts = [];
  let buf = "";
  for (const ch of raw) {
    buf += ch;
    if (PUNCT.includes(ch)) {
      parts.push(buf);
      buf = "";
    }
  }
  if (buf) parts.push(buf);
  return parts.filter((p) => p.length > 0);
}

function substantiveLen(s) {
  return s.replace(/[“”‘’「」『』（）()\s]/g, "").length;
}

function mergeOrphans(parts) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    // 仅剩引号/括号的碎片并入前一块，否则并入下一块
    if (substantiveLen(p) === 0) {
      if (out.length) {
        out[out.length - 1] += p;
      } else if (i + 1 < parts.length) {
        parts[i + 1] = p + parts[i + 1];
      } else {
        out.push(p);
      }
      continue;
    }
    out.push(p);
  }
  return out;
}

function mergeShort(parts, minLen) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    while (substantiveLen(p) < minLen && i + 1 < parts.length) {
      i++;
      p += parts[i];
    }
    out.push(p);
  }
  return out;
}

function mergeToMax(parts, max) {
  let arr = parts.slice();
  while (arr.length > max) {
    // 合并最短相邻对
    let best = 0;
    let bestScore = Infinity;
    for (let i = 0; i < arr.length - 1; i++) {
      const score = arr[i].length + arr[i + 1].length;
      if (score < bestScore) {
        bestScore = score;
        best = i;
      }
    }
    arr.splice(best, 2, arr[best] + arr[best + 1]);
  }
  return arr;
}

/**
 * 生成词块：目标 2–6 块；过碎合并；过碎仍 1 块则保留整节。
 */
function makeWords(raw) {
  let parts = splitByPunct(raw);
  if (parts.length === 0) return [raw];

  parts = mergeOrphans(parts);
  // 过短碎片向后合并（保留启1:3「都是有福的，」这类 ≥4 字意群）
  parts = mergeShort(parts, 4);

  // 超过 6 块则合并
  if (parts.length > 6) parts = mergeToMax(parts, 6);

  // 再次清掉合并后可能残留的空实质块
  parts = mergeOrphans(parts);

  // 校验拼接等于原文
  if (parts.join("") !== raw) {
    return [raw];
  }
  return parts;
}

function loadRevelation() {
  const code = fs.readFileSync(BIBLE_PATH, "utf8");
  const sandbox = {};
  vm.runInNewContext(code + "\nthis.__bible = (typeof bibleData !== 'undefined' ? bibleData : null);", sandbox);
  if (!sandbox.__bible || !sandbox.__bible.revelation) {
    throw new Error("无法从 bible_full.js 读取 revelation");
  }
  return sandbox.__bible.revelation;
}

function buildChapters(rev) {
  const chapters = [];
  for (let c = 1; c <= 22; c++) {
    const verses = rev.verses[c] || [];
    const levels = verses.map((raw, idx) => {
      const verse = idx + 1;
      return {
        raw,
        tr: "启" + c + ":" + verse,
        words: makeWords(raw)
      };
    });
    chapters.push({
      name: CH_NAMES[c - 1],
      levels
    });
  }
  return chapters;
}

function expectedCh1Template() {
  return [
    {
      raw: "耶稣基督的启示，就是神赐给他，叫他将必要快成的事指示他的众仆人。他就差遣使者晓谕他的仆人约翰。",
      words: ["耶稣基督的启示，", "就是神赐给他，", "叫他将必要快成的事指示他的众仆人。", "他就差遣使者晓谕他的仆人约翰。"],
      tr: "启1:1"
    },
    {
      raw: "约翰便将神的道和耶稣基督的见证，凡自己所看见的都证明出来。",
      words: ["约翰便将神的道和耶稣基督的见证，", "凡自己所看见的都证明出来。"],
      tr: "启1:2"
    },
    {
      raw: "念这书上预言的和那些听见又遵守其中所记载的，都是有福的，因为日期近了。",
      words: ["念这书上预言的和那些听见又遵守其中所记载的，", "都是有福的，", "因为日期近了。"],
      tr: "启1:3"
    }
  ];
}

function normLevel(lv) {
  return { raw: lv.raw, tr: lv.tr, words: lv.words };
}

function assertDeepEqual(a, b, label) {
  const sa = JSON.stringify(a.map(normLevel));
  const sb = JSON.stringify(b.map(normLevel));
  if (sa !== sb) {
    console.error("❌ " + label + " 不一致");
    console.error("期望:", sb);
    console.error("实际:", sa);
    process.exitCode = 1;
    return false;
  }
  console.log("✅ " + label);
  return true;
}

function spotCheck(chapters) {
  const samples = [
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 6],
    [21, 0],
    [21, 26],
    [22, 0],
    [22, 20]
  ];
  let ok = true;
  for (const [ch, li] of samples) {
    const lv = chapters[ch - 1].levels[li];
    if (!lv) {
      console.error("❌ 缺少 启" + ch + " 第" + (li + 1) + "关");
      ok = false;
      continue;
    }
    const joined = lv.words.join("");
    if (joined !== lv.raw) {
      console.error("❌ 切块拼接不等于原文:", lv.tr);
      ok = false;
      continue;
    }
    if (lv.words.length < 1 || lv.words.length > 6) {
      console.warn("⚠ 词块数异常", lv.tr, lv.words.length);
    }
    console.log(
      "✓",
      lv.tr,
      "词块",
      lv.words.length,
      "｜",
      lv.words.map((w) => w.slice(0, 12) + (w.length > 12 ? "…" : "")).join(" / ")
    );
  }
  return ok;
}

function writeOutputs(chapters) {
  const payload = {
    _gen: "bible_full",
    _v: 5,
    title: "趣味•启示录",
    author: "北京青年团契",
    brandTitle: "趣味•启示录",
    brandSub: "背诵闯关",
    chapters
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), "utf8");

  const js =
    "/* eslint-disable */\n" +
    "/* 由 tools/gen-revelation-levels.js 自动生成，请勿手改。数据源：bible_full.js → revelation */\n" +
    "window.REVELATION_LEVELS = " +
    JSON.stringify(payload) +
    ";\n";
  fs.writeFileSync(OUT_JS, js, "utf8");

  const total = chapters.reduce((n, ch) => n + ch.levels.length, 0);
  console.log("已写入:", path.relative(ROOT, OUT_JS));
  console.log("已写入:", path.relative(ROOT, OUT_JSON));
  console.log("章节:", chapters.length, "关卡合计:", total);
}

function main() {
  const rev = loadRevelation();
  const chapters = buildChapters(rev);

  const tpl = expectedCh1Template();
  const got = chapters[0].levels.slice(0, 3);
  assertDeepEqual(got, tpl, "启1:1–3 与现模板一致");

  const total = chapters.reduce((n, ch) => n + ch.levels.length, 0);
  if (total !== 404) {
    console.error("❌ 期望 404 关，实际", total);
    process.exitCode = 1;
  } else {
    console.log("✅ 关卡总数 404");
  }

  if (!spotCheck(chapters)) process.exitCode = 1;

  if (process.argv.includes("--check")) {
    process.exit(process.exitCode || 0);
  }

  writeOutputs(chapters);
  process.exit(process.exitCode || 0);
}

main();
