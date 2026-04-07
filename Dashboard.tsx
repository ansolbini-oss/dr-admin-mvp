'use client'
import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const reductionData = [
  { date: '3/1', cbl: 2400, actual: 1950, reduction: 450 },
  { date: '3/3', cbl: 2200, actual: 1800, reduction: 400 },
  { date: '3/5', cbl: 2600, actual: 2000, reduction: 600 },
  { date: '3/8', cbl: 2300, actual: 1750, reduction: 550 },
  { date: '3/10', cbl: 2500, actual: 1900, reduction: 600 },
  { date: '3/12', cbl: 2800, actual: 2100, reduction: 700 },
  { date: '3/15', cbl: 2400, actual: 1850, reduction: 550 },
]

const typeData = [
  { name: '국민DR', value: 142, color: '#3b6ef0' },
  { name: '표준DR', value: 58, color: '#2ecc8b' },
  { name: '플러스DR', value: 34, color: '#f0a93b' },
  { name: '주파수DR', value: 21, color: '#8b6ef0' },
  { name: '제주DR', value: 15, color: '#e05252' },
]

const monthlySettlement = [
  { month: '10월', amount: 142 }, { month: '11월', amount: 168 },
  { month: '12월', amount: 195 }, { month: '1월', amount: 178 },
  { month: '2월', amount: 203 }, { month: '3월', amount: 221 },
]

const recentEvents = [
  { id: 'EVT-2024-031', type: '국민DR', status: '이행완료', reduction: '1,240 kW', rate: '94.2%', time: '오늘 14:00' },
  { id: 'EVT-2024-030', type: '표준DR', status: '검증중', reduction: '3,600 kW', rate: '88.7%', time: '어제 16:00' },
  { id: 'EVT-2024-029', type: '플러스DR', status: '정산대기', reduction: '980 kW', rate: '91.5%', time: '3/12 13:00' },
  { id: 'EVT-2024-028', type: '국민DR', status: '정산완료', reduction: '1,150 kW', rate: '96.1%', time: '3/10 15:00' },
]

const onboardingFunnel = [
  { stage: '리드 등록', count: 48, pct: 100 },
  { stage: '사전검증', count: 31, pct: 65 },
  { stage: '계약 체결', count: 22, pct: 46 },
  { stage: '계정 생성', count: 18, pct: 38 },
  { stage: '운영 중', count: 14, pct: 29 },
]

const alarms = [
  { type: 'danger', msg: '계측기 통신 장애 — 자원 RSC-041 (표준DR)', time: '13분 전' },
  { type: 'warning', msg: 'OpenADR 인증서 만료 D-22', time: '1시간 전' },
  { type: 'accent', msg: '이벤트 EVT-2024-031 급전지시 수신 완료', time: '2시간 전' },
  { type: 'success', msg: '3월 정산금 입금 확인 — 식스티헤르츠 수령', time: '3시간 전' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>{p.name}: {p.value.toLocaleString()}</div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [tab, setTab] = useState('all')

  return (
    <div style={{ padding: '24px', maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>대시보드</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>2026년 3월 기준 · 실시간 업데이트</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>리포트 다운로드</button>
          <button className="btn btn-primary" style={{ fontSize: 12 }}>이벤트 현황</button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: '전체 자원', value: '270', sub: '활성 214 · 대기 43 · 박탈 13', color: 'var(--accent)' },
          { label: '참여 고객', value: '1,847', sub: '이번 달 신규 +38', color: 'var(--success)' },
          { label: '당월 예상 정산금', value: '₩221M', sub: '전월 대비 +8.9%', color: 'var(--warning)' },
          { label: '계측기 장애', value: '4', sub: '즉시 점검 필요', color: 'var(--danger)' },
          { label: '이행률(당월 평균)', value: '92.6%', sub: 'RRMSE 기준 적합', color: 'var(--purple)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        {/* CBL vs 실측 */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>CBL vs 실측 부하 (kW)</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['all','국민DR','표준DR','플러스DR'].map(t => (
                <span key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)} style={{ fontSize: 11, padding: '4px 10px' }}>{t}</span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={reductionData}>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="cbl" stroke="var(--text-muted)" strokeWidth={1.5} dot={false} name="CBL" strokeDasharray="4 2" />
              <Line type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2} dot={false} name="실측" />
              <Line type="monotone" dataKey="reduction" stroke="var(--success)" strokeWidth={2} dot={false} name="감축" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {[
              { label: 'CBL', color: 'var(--text-muted)' },
              { label: '실측 부하', color: 'var(--accent)' },
              { label: '감축량', color: 'var(--success)' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                <span style={{ width: 20, height: 2, background: l.color, display: 'inline-block', borderRadius: 1 }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* DR 유형별 */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>DR 유형별 고객 수</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={typeData} dataKey="value" cx="50%" cy="50%" innerRadius={34} outerRadius={56} paddingAngle={2}>
                  {typeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {typeData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="dot" style={{ background: d.color }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Monthly settlement */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>월별 정산금 추이 (백만원)</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={monthlySettlement} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="var(--accent)" radius={[3, 3, 0, 0]} name="정산금" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Onboarding funnel */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>온보딩 파이프라인</div>
          {onboardingFunnel.map((f, i) => (
            <div key={f.stage} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.stage}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{f.count}건</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${f.pct}%`, height: '100%', background: `rgba(59,110,240,${1 - i * 0.15})`, borderRadius: 3, transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Recent events */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>최근 이벤트 이행 현황</div>
          <table>
            <thead>
              <tr>
                <th>이벤트 ID</th><th>유형</th><th>감축량</th><th>이행률</th><th>상태</th><th>시간</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map(e => (
                <tr key={e.id}>
                  <td style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12 }}>{e.id}</td>
                  <td><span className="badge badge-accent">{e.type}</span></td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{e.reduction}</td>
                  <td style={{ color: e.rate >= '90' ? 'var(--success)' : 'var(--warning)', fontWeight: 600 }}>{e.rate}</td>
                  <td>
                    <span className={`badge ${e.status === '이행완료' || e.status === '정산완료' ? 'badge-success' : e.status === '검증중' ? 'badge-warning' : 'badge-muted'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>알림 센터</div>
          {alarms.map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, padding: '10px 0',
              borderBottom: i < alarms.length - 1 ? '1px solid var(--border)' : 'none'
            }}>
              <span className="dot" style={{
                background: a.type === 'danger' ? 'var(--danger)' : a.type === 'warning' ? 'var(--warning)' : a.type === 'success' ? 'var(--success)' : 'var(--accent)',
                marginTop: 4, flexShrink: 0
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{a.time}</div>
              </div>
            </div>
          ))}
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 12 }}>전체 알림 보기</button>
        </div>
      </div>
    </div>
  )
}
