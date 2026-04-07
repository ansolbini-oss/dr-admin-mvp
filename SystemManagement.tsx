'use client'
import { useState } from 'react'

const logs = [
  { time: '14:32:01', user: 'admin@60hz.io', action: '정산 확정', target: 'STL-2026-03', ip: '192.168.1.10' },
  { time: '14:28:44', user: 'operator01@60hz.io', action: '고객 정보 수정', target: 'CUS-0234', ip: '192.168.1.22' },
  { time: '14:15:20', user: 'system', action: 'OpenADR 이벤트 수신', target: 'EVT-2024-031', ip: 'KPX-VPN' },
  { time: '13:50:11', user: 'admin@60hz.io', action: '리드 등록', target: 'LD-0049', ip: '192.168.1.10' },
  { time: '13:22:09', user: 'operator02@60hz.io', action: 'CBL 분석 실행', target: 'LD-0048', ip: '192.168.1.35' },
]

const notifyTemplates = [
  { id: 'TPL-001', name: '급전지시 수신 알림', channel: 'SMS+카카오', target: '참여고객', status: '활성' },
  { id: 'TPL-002', name: '시험 실시 예고', channel: 'SMS', target: '참여고객', status: '활성' },
  { id: 'TPL-003', name: '정산금 지급 완료', channel: '카카오', target: '참여고객', status: '활성' },
  { id: 'TPL-004', name: 'OpenADR 장애 알림', channel: '이메일', target: '운영자', status: '활성' },
  { id: 'TPL-005', name: '계측기 장애 감지', channel: 'SMS+이메일', target: '운영자', status: '활성' },
]

const users = [
  { id: 'USR-001', name: '안솔빈', email: 'admin@60hz.io', role: '시스템 관리자', status: '활성', last: '2026-03-15 14:32' },
  { id: 'USR-002', name: '이민지', email: 'operator01@60hz.io', role: '운영자', status: '활성', last: '2026-03-15 14:28' },
  { id: 'USR-003', name: '최수현', email: 'operator02@60hz.io', role: '운영자', status: '활성', last: '2026-03-15 13:22' },
  { id: 'USR-004', name: '박준호', email: 'viewer01@60hz.io', role: '조회자', status: '비활성', last: '2026-03-10 09:15' },
]

type Props = { activeNav: string }

export default function SystemManagement({ activeNav }: Props) {

  if (activeNav === 'system-notify') {
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>알림 관리</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>SMS·카카오톡 알림 템플릿 및 발송 이력</p>
          </div>
          <button className="btn btn-primary">+ 템플릿 등록</button>
        </div>

        <div className="card" style={{ padding: 0, marginBottom: 16 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>알림 템플릿</div>
          <table>
            <thead><tr><th>ID</th><th>템플릿명</th><th>발송 채널</th><th>대상</th><th>상태</th><th></th></tr></thead>
            <tbody>
              {notifyTemplates.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{t.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</td>
                  <td><span className="badge badge-accent">{t.channel}</span></td>
                  <td>{t.target}</td>
                  <td><span className={`badge ${t.status === '활성' ? 'badge-success' : 'badge-muted'}`}>{t.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>수정</button>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>테스트 발송</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>최근 발송 이력</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { time: '14:32', template: '급전지시 수신 알림', count: 142, success: 140, channel: 'SMS' },
              { time: '14:30', template: '급전지시 수신 알림', count: 142, success: 139, channel: '카카오' },
              { time: '10:00', template: '시험 실시 예고', count: 21, success: 21, channel: 'SMS' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-3)', borderRadius: 6 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{h.time}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{h.template}</span>
                  <span className="badge badge-muted">{h.channel}</span>
                </div>
                <div style={{ fontSize: 12, color: h.success === h.count ? 'var(--success)' : 'var(--warning)' }}>
                  {h.success}/{h.count} 성공
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (activeNav === 'system-log') {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>감사 로그</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <input className="input" placeholder="사용자·액션 검색" style={{ maxWidth: 200 }} />
            <button className="btn btn-secondary" style={{ fontSize: 12 }}>로그 내보내기</button>
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>시각</th><th>사용자</th><th>액션</th><th>대상</th><th>IP</th></tr></thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{l.time}</td>
                  <td style={{ fontSize: 12 }}>{l.user}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 12 }}>{l.action}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--accent)' }}>{l.target}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (activeNav === 'system-openADR') {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>OpenADR 2.0b 연동 상태</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {[
            { label: 'VPN 연결', value: '정상', color: 'var(--success)', detail: 'KPX 전용망 · 응답 12ms' },
            { label: '공인인증서', value: 'D-22 만료', color: 'var(--warning)', detail: '2026-04-06 만료 · 갱신 필요' },
            { label: '마지막 수신', value: '14:32:01', color: 'var(--text-primary)', detail: 'EiEvent — EVT-2024-031' },
            { label: '장애 이력(30일)', value: '1건', color: 'var(--danger)', detail: 'RSC-005 계측기 오류 (03-15)' },
          ].map(s => (
            <div key={s.label} className="card">
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ borderLeft: '3px solid var(--warning)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>인증서 갱신 필요</div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
            공인인증서 만료 22일 전입니다. KPX 보안 가이드라인에 따라 전용망 VPN 접속 및 공인인증서 기반 전자서명을 유지해야 합니다.
          </p>
          <button className="btn btn-warning" style={{ background: 'var(--warning-dim)', color: 'var(--warning)', border: '1px solid transparent' }}>
            인증서 갱신 요청
          </button>
        </div>
      </div>
    )
  }

  if (activeNav === 'system-account') {
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>계정·권한 관리</h1>
          <button className="btn btn-primary">+ 사용자 추가</button>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>사용자 ID</th><th>이름</th><th>이메일</th><th>역할</th><th>상태</th><th>마지막 접속</th><th></th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{u.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</td>
                  <td style={{ fontSize: 12 }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === '시스템 관리자' ? 'badge-purple' : u.role === '운영자' ? 'badge-accent' : 'badge-muted'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td><span className={`badge ${u.status === '활성' ? 'badge-success' : 'badge-muted'}`}>{u.status}</span></td>
                  <td style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.last}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>권한 수정</button>
                      {u.status === '활성' && <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: 'var(--danger)' }}>비활성화</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (activeNav === 'system-settings') {
    return (
      <div style={{ padding: 24, maxWidth: 640 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>환경 설정</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              title: 'OpenADR 연동',
              fields: [
                { label: 'VTN 서버 주소', value: 'https://oadr.kpx.or.kr/OpenADR2/Simple/2.0b' },
                { label: 'VEN ID', value: 'SIXTYHERTZ-VEN-001' },
                { label: 'Poll 간격 (초)', value: '30' },
              ]
            },
            {
              title: '정산 설정',
              fields: [
                { label: '감축량 단가 (원/kWh)', value: '55' },
                { label: '이행률 기준 하한', value: '80%' },
                { label: '정산 공식 버전', value: 'v2.4 (활성)' },
              ]
            },
            {
              title: '알림 설정',
              fields: [
                { label: 'SMS 발신번호', value: '1588-0000' },
                { label: '긴급 알림 이메일', value: 'ops@60hz.io' },
              ]
            },
          ].map(section => (
            <div key={section.title} className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{section.title}</div>
              {section.fields.map(f => (
                <div key={f.label} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <input className="input" defaultValue={f.value} />
                </div>
              ))}
              <button className="btn btn-secondary" style={{ fontSize: 12 }}>저장</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>운영관리·시스템</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { label: '알림 관리', desc: '템플릿 등록·발송 이력', nav: 'system-notify' },
          { label: '감사 로그', desc: '사용자 행위 추적', nav: 'system-log' },
          { label: 'OpenADR 연동', desc: '통신 상태 모니터링', nav: 'system-openADR' },
          { label: '계정·권한 관리', desc: '사용자 및 역할 설정', nav: 'system-account' },
          { label: '환경 설정', desc: 'API·정산·알림 설정', nav: 'system-settings' },
        ].map(item => (
          <div key={item.label} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
