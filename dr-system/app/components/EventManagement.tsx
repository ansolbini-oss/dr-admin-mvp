'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const events = [
  { id: 'EVT-2024-031', type: '국민DR', resource: 'RSC-001', issued: '2026-03-15 14:00', duration: '60분', target: '4,260 kW', reduction: '4,015 kW', rate: '94.2%', rrmse: '0.118', status: '이행완료' },
  { id: 'EVT-2024-030', type: '표준DR', resource: 'RSC-002', issued: '2026-03-14 16:00', duration: '90분', target: '8,400 kW', reduction: '7,451 kW', rate: '88.7%', rrmse: '0.142', status: '검증중' },
  { id: 'EVT-2024-029', type: '플러스DR', resource: 'RSC-003', issued: '2026-03-12 13:00', duration: '60분', target: '12,200 kW', reduction: '11,163 kW', rate: '91.5%', rrmse: '0.131', status: '정산대기' },
  { id: 'EVT-2024-028', type: '국민DR', resource: 'RSC-001', issued: '2026-03-10 15:00', duration: '60분', target: '4,260 kW', reduction: '4,093 kW', rate: '96.1%', rrmse: '0.098', status: '정산완료' },
]

const heatmapData = [
  { day: '월', h10: 96, h11: 88, h12: 92, h13: 91, h14: 94, h15: 89, h16: 87, h17: 93 },
  { day: '화', h10: 94, h11: 91, h12: 95, h13: 88, h14: 96, h15: 92, h16: 90, h17: 91 },
  { day: '수', h10: 89, h11: 86, h12: 88, h13: 84, h14: 91, h15: 87, h16: 85, h17: 88 },
  { day: '목', h10: 93, h11: 90, h12: 92, h13: 89, h14: 95, h15: 91, h16: 88, h17: 92 },
  { day: '금', h10: 97, h11: 94, h12: 96, h13: 93, h14: 98, h15: 95, h16: 92, h17: 94 },
]

const meterData = [
  { time: '14:00', cbL: 4260, actual: 3950, reduction: 310 },
  { time: '14:15', cbL: 4180, actual: 1820, reduction: 2360 },
  { time: '14:30', cbL: 4200, actual: 420, reduction: 3780 },
  { time: '14:45', cbL: 4150, actual: 240, reduction: 3910 },
  { time: '15:00', cbL: 4260, actual: 4015, reduction: 245 },
]

const nonCompliant = [
  { customer: '(주)세종빌딩', target: 200, actual: 80, rate: 40, reason: '설비 오작동', penalty: '₩120,000' },
  { customer: '한강물산', target: 150, actual: 0, rate: 0, reason: '통신 장애', penalty: '₩225,000' },
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

type Props = { activeNav: string }

export default function EventManagement({ activeNav }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  if (activeNav === 'event-analysis') {
    return (
      <div style={{ padding: 24, maxWidth: 1100 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>이행률 분석</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select className="select" style={{ maxWidth: 130 }}><option>2026년 3월</option><option>2026년 2월</option></select>
            <select className="select" style={{ maxWidth: 130 }}><option>전체 유형</option><option>국민DR</option><option>표준DR</option></select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {/* Heatmap */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>시간대별 이행률 히트맵 (%)</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 20 }}>
                {heatmapData.map(d => (
                  <div key={d.day} style={{ fontSize: 11, color: 'var(--text-muted)', height: 28, display: 'flex', alignItems: 'center', paddingRight: 8 }}>{d.day}</div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {['10시','11시','12시','13시','14시','15시','16시','17시'].map(h => (
                    <div key={h} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)' }}>{h}</div>
                  ))}
                </div>
                {heatmapData.map(row => (
                  <div key={row.day} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[row.h10, row.h11, row.h12, row.h13, row.h14, row.h15, row.h16, row.h17].map((v, i) => (
                      <div key={i} style={{
                        flex: 1, height: 28, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 600,
                        background: v >= 95 ? 'rgba(46,204,139,0.6)' : v >= 90 ? 'rgba(46,204,139,0.35)' : v >= 85 ? 'rgba(240,169,59,0.4)' : 'rgba(224,82,82,0.4)',
                        color: v >= 90 ? 'var(--success)' : v >= 85 ? 'var(--warning)' : 'var(--danger)'
                      }}>{v}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CBL vs 실측 */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>이벤트별 CBL·실측·감축량 (kW)</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={meterData}>
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="cbL" stroke="var(--text-muted)" strokeWidth={1.5} dot={false} name="CBL" strokeDasharray="4 2" />
                <Line type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2} dot={false} name="실측" />
                <Line type="monotone" dataKey="reduction" stroke="var(--success)" strokeWidth={2} dot={false} name="감축" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RRMSE */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>RRMSE 적합 여부 (기준: 0.20 이하)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {events.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', width: 140 }}>{e.id}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 60 }}>{e.type}</span>
                <div style={{ flex: 1, height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${parseFloat(e.rrmse) / 0.20 * 100}%`, height: '100%', background: parseFloat(e.rrmse) <= 0.15 ? 'var(--success)' : 'var(--warning)', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: parseFloat(e.rrmse) <= 0.15 ? 'var(--success)' : 'var(--warning)', width: 50 }}>{e.rrmse}</span>
                <span className={`badge ${parseFloat(e.rrmse) <= 0.20 ? 'badge-success' : 'badge-danger'}`}>
                  {parseFloat(e.rrmse) <= 0.20 ? '적합' : '부적합'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (activeNav === 'event-verify') {
    return (
      <div style={{ padding: 24, maxWidth: 860 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>미이행 자원 검증</h1>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>미이행 고객 목록</div>
          <table>
            <thead><tr><th>참여고객</th><th>목표(kW)</th><th>실제 감축(kW)</th><th>이행률</th><th>미이행 사유</th><th>예상 패널티</th><th></th></tr></thead>
            <tbody>
              {nonCompliant.map(n => (
                <tr key={n.customer}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{n.customer}</td>
                  <td>{n.target}</td>
                  <td style={{ color: 'var(--danger)', fontWeight: 600 }}>{n.actual}</td>
                  <td style={{ color: 'var(--danger)', fontWeight: 700 }}>{n.rate}%</td>
                  <td><span className="badge badge-warning">{n.reason}</span></td>
                  <td style={{ color: 'var(--danger)', fontWeight: 600 }}>{n.penalty}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>사유 검토</button>
                      <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>패널티 면제 신청</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{ borderLeft: '3px solid var(--warning)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>패널티 규칙</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            · 이행률 80% 미만: 정산금의 10% 패널티<br />
            · 미이행(0%): 정산금 전액 환수<br />
            · 통신 장애 등 불가항력: 면제 신청 가능 (KPX 승인 필요)
          </div>
        </div>
      </div>
    )
  }

  if (activeNav === 'event-report') {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>검증 리포트</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ fontSize: 12 }}>PDF 다운로드</button>
            <button className="btn btn-primary" style={{ fontSize: 12 }}>KPX 제출</button>
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>EVT-2024-031 이행 검증 리포트</div>
          {[
            ['이벤트 ID', 'EVT-2024-031'], ['대상 자원', 'RSC-001 국민DR 수도권 A'],
            ['발령 일시', '2026-03-15 14:00'], ['지속 시간', '60분'],
            ['목표 감축량', '4,260 kW'], ['실제 감축량', '4,015 kW'],
            ['이행률', '94.2%'], ['RRMSE', '0.118 (적합)'],
            ['미이행 고객', '2건 (패널티 적용)'], ['최종 검증 결과', '이행 확인'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: k === '최종 검증 결과' ? 'var(--success)' : 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Event list (default)
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>이벤트 조회</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>급전지시 수신 및 이행 이력</p>
        </div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th>이벤트 ID</th><th>DR 유형</th><th>자원</th><th>발령 일시</th><th>지속</th><th>목표</th><th>실제 감축</th><th>이행률</th><th>RRMSE</th><th>상태</th><th></th></tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{e.id}</td>
                <td><span className="badge badge-accent">{e.type}</span></td>
                <td style={{ fontSize: 11 }}>{e.resource}</td>
                <td style={{ fontSize: 11 }}>{e.issued}</td>
                <td>{e.duration}</td>
                <td>{e.target}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.reduction}</td>
                <td style={{ fontWeight: 700, color: parseFloat(e.rate) >= 90 ? 'var(--success)' : 'var(--warning)' }}>{e.rate}</td>
                <td style={{ fontSize: 12, color: parseFloat(e.rrmse) <= 0.15 ? 'var(--success)' : 'var(--warning)' }}>{e.rrmse}</td>
                <td>
                  <span className={`badge ${e.status === '이행완료' || e.status === '정산완료' ? 'badge-success' : e.status === '검증중' ? 'badge-warning' : 'badge-muted'}`}>
                    {e.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>상세</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
