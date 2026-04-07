'use client'
import { useState } from 'react'

const trials = [
  { id: 'TRL-0024', resource: 'RSC-004 주파수DR 전국', scheduled: '2026-03-20 10:00', duration: '60분', target: '18,900 kW', status: '계획', result: '-' },
  { id: 'TRL-0023', resource: 'RSC-006 중소형DR 비수도권 A', scheduled: '2026-03-18 14:00', duration: '30분', target: '2,400 kW', status: '완료', result: '92.4%' },
  { id: 'TRL-0022', resource: 'RSC-001 국민DR 수도권 A', scheduled: '2026-03-10 11:00', duration: '60분', target: '4,260 kW', status: '완료', result: '88.7%' },
]

const liveData = [
  { customer: '(주)광명에너지', target: 500, current: 312, rate: 62.4, status: '이행중' },
  { customer: '대전제조공장', target: 1200, current: 1180, rate: 98.3, status: '이행완료' },
  { customer: '부산물류센터', target: 800, current: 0, rate: 0, status: '미응답' },
  { customer: '인천냉동창고', target: 350, current: 340, rate: 97.1, status: '이행완료' },
  { customer: '강남물산', target: 45, current: 38, rate: 84.4, status: '이행중' },
]

type Props = { activeNav: string }

export default function TrialManagement({ activeNav }: Props) {
  const [tab, setTab] = useState('plan')

  if (activeNav === 'trial-monitor') {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>시험 실시간 모니터링</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>TRL-0024 · RSC-004 주파수DR 전국 · 진행중 38분 경과</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-warning">시험 진행중</span>
            <button className="btn btn-danger" style={{ fontSize: 12 }}>시험 강제 종료</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: '목표 감축', value: '18,900 kW', color: 'var(--text-primary)' },
            { label: '현재 감축', value: '14,240 kW', color: 'var(--success)' },
            { label: '이행률', value: '75.3%', color: 'var(--warning)' },
            { label: '미응답 자원', value: '1개', color: 'var(--danger)' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: s.color, fontSize: 20 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
            고객별 실시간 이행 현황
          </div>
          <table>
            <thead><tr><th>참여고객</th><th>목표(kW)</th><th>현재 감축(kW)</th><th>이행률</th><th>진행 바</th><th>상태</th></tr></thead>
            <tbody>
              {liveData.map(d => (
                <tr key={d.customer}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{d.customer}</td>
                  <td>{d.target}</td>
                  <td style={{ color: d.rate >= 90 ? 'var(--success)' : d.rate > 0 ? 'var(--warning)' : 'var(--danger)', fontWeight: 600 }}>{d.current}</td>
                  <td style={{ color: d.rate >= 90 ? 'var(--success)' : d.rate > 0 ? 'var(--warning)' : 'var(--danger)', fontWeight: 700 }}>{d.rate}%</td>
                  <td style={{ width: 120 }}>
                    <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(d.rate, 100)}%`, height: '100%', borderRadius: 3,
                        background: d.rate >= 90 ? 'var(--success)' : d.rate > 0 ? 'var(--warning)' : 'var(--danger)',
                        transition: 'width 0.5s' }} />
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${d.status === '이행완료' ? 'badge-success' : d.status === '이행중' ? 'badge-accent' : 'badge-danger'}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (activeNav === 'trial-result') {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>시험 결과</h1>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>TRL-0023 — RSC-006 중소형DR 비수도권 A</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: '시험 일시', value: '2026-03-18 14:00' },
              { label: '시험 시간', value: '30분' },
              { label: '목표 감축량', value: '2,400 kW' },
              { label: '실제 감축량', value: '2,218 kW' },
              { label: '이행률', value: '92.4%' },
              { label: '최종 판정', value: '합격' },
            ].map(s => (
              <div key={s.label} style={{ padding: '10px 14px', background: 'var(--bg-3)', borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: s.label === '최종 판정' ? 'var(--success)' : 'var(--text-primary)' }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary">운영 전환 처리</button>
            <button className="btn btn-secondary">결과 리포트 저장</button>
          </div>
        </div>
      </div>
    )
  }

  // Trial plan (default)
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700 }}>시험 계획</h1>
        <button className="btn btn-primary">+ 시험 계획 등록</button>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>시험 ID</th><th>대상 자원</th><th>예정 일시</th><th>지속 시간</th><th>목표 감축</th><th>상태</th><th>이행률</th><th></th></tr></thead>
          <tbody>
            {trials.map(t => (
              <tr key={t.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{t.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{t.resource}</td>
                <td style={{ fontSize: 12 }}>{t.scheduled}</td>
                <td>{t.duration}</td>
                <td>{t.target}</td>
                <td><span className={`badge ${t.status === '완료' ? 'badge-success' : 'badge-accent'}`}>{t.status}</span></td>
                <td style={{ color: t.result !== '-' ? 'var(--success)' : 'var(--text-muted)', fontWeight: t.result !== '-' ? 700 : 400 }}>{t.result}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {t.status === '계획' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}>시험 시작</button>}
                    {t.status === '완료' && <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>결과 보기</button>}
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
