import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { prisma } from "../generated/prisma-client";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "dev@WeGoods.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
  };
  return sgMail.send(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const getMinMaxFilterIndex = async condition => {
  if (condition === "MIN") {
    var maxIndexFilter = await prisma.filters({
      orderBy: "filterIndex_ASC",
      first: 1
    });
  } else if (condition === "MAX") {
    var maxIndexFilter = await prisma.filters({
      orderBy: "filterIndex_DESC",
      first: 1
    });
  } else {
    throw Error("condition not defined");
  }
  return maxIndexFilter === undefined ? 0 : maxIndexFilter[0].filterIndex;
};

export const getRandomIntExclusive = (range, n) => {
  // 0 부터 range (미포함) 사이의 임의 정수를 n개 생성하여 반환

  var numbers = [];
  // 범위안의 수가 뽑고자 하는 갯수가 적을 경우 어쩔 수 없이
  // 뽑고자 하는 갯수를 줄여 버린다.
  range < n ? (n = range) : n;

  for (var i = 0; i < n; i++) {
    // 랜덤 숫자 생성
    numbers[i] = Math.floor(Math.random() * range);
    for (var j = 0; j < i; j++) {
      if (numbers[i] == numbers[j]) {
        i--; // i를 밀고 break(다시 하나더 뽑아라)
        break;
      }
    }
  }
  return numbers;
};
