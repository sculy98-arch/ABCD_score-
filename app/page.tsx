"use client";

import { useState } from "react";

export default function Home() {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [cPeptide, setCPeptide] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<any>(null);

  function calculate() {
    const a = Number(age);
    const b = Number(bmi);
    const c = Number(cPeptide);
    const d = Number(duration);

    const ageScore = a >= 40 ? 0 : 1;

    const bmiScore =
      b < 27 ? 0 :
      b < 35 ? 1 :
      b < 42 ? 2 : 3;

    const cScore =
      c < 2 ? 0 :
      c < 3 ? 1 :
      c < 5 ? 2 : 3;

    const durationScore =
      d >= 8 ? 0 :
      d >= 4 ? 1 :
      d >= 1 ? 2 : 3;

    const total =
      ageScore +
      bmiScore +
      cScore +
      durationScore;

    const sleeve: Record<number, string> = {
      0: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "30%",
      5: "40%",
      6: "45%",
      7: "45%",
      8: "78%",
      9: "90%",
      10: "99%",
    };

    const bypass: Record<number, string> = {
      0: "33%",
      1: "33%",
      2: "43%",
      3: "46%",
      4: "46%",
      5: "57%",
      6: "87%",
      7: "87%",
      8: "99%",
      9: "99%",
      10: "99%",
    };

    setResult({
      ageScore,
      bmiScore,
      cScore,
      durationScore,
      total,
      sleeve: sleeve[total],
      bypass: bypass[total],
    });
  }

  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>ABCD 점수 계산기</h1>

        <label>나이 (세)</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="예: 35"
          style={inputStyle}
        />

        <label style={labelStyle}>
          BMI (kg/m²)
        </label>
        <input
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          type="number"
          placeholder="예: 32"
          style={inputStyle}
        />

        <label style={labelStyle}>
          공복 C-펩타이드 (ng/mL)
        </label>
        <input
          value={cPeptide}
          onChange={(e) => setCPeptide(e.target.value)}
          type="number"
          placeholder="예: 3.2"
          style={inputStyle}
        />

        <label style={labelStyle}>
          당뇨병 유병기간 (년)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="예: 5"
          style={inputStyle}
        />

        <button onClick={calculate} style={buttonStyle}>
          계산하기
        </button>

        {result && (
          <div style={resultStyle}>
            <h2 style={{ marginBottom: "15px" }}>
              계산 결과
            </h2>

            <p>나이 점수: {result.ageScore}</p>
            <p>BMI 점수: {result.bmiScore}</p>
            <p>공복 C-펩타이드 점수: {result.cScore}</p>
            <p>당뇨병 유병기간 점수: {result.durationScore}</p>

            <hr style={{ margin: "20px 0" }} />

            <h2>
              ABCD 총점: {result.total}점
            </h2>

            <p style={{ marginTop: "15px" }}>
              위소매절제술 후 완전완화율:
              <strong> {result.sleeve}</strong>
            </p>

            <p>
              위우회술 후 완전완화율:
              <strong> {result.bypass}</strong>
            </p>

            <p
              style={{
                marginTop: "20px",
                fontSize: "13px",
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              ※ 본 계산기는 참고용 보조 도구이며,
              최종 진료 판단은 의료진의
              임상적 판단에 따릅니다.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9",
  fontFamily: "sans-serif",
  padding: "20px",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  width: "420px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "30px",
};

const labelStyle = {
  marginTop: "20px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#0f172a",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const resultStyle = {
  marginTop: "30px",
  padding: "20px",
  borderRadius: "16px",
  background: "#f8fafc",
};