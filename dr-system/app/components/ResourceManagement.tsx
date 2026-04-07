'use client'
import { useState } from 'react'

const resources = [
  { id: 'RSC-001', name: '국민DR 수도권 A', type: '국민DR', status: '운영중', customers: 142, capacity: '4,260 kW', kpxId: 'KPX-RSC-2401', region: '수도권', lastCheck: '정상' },
  { id: 'RSC-002', name: '표준DR 수도권 A', type: '표준DR', status: '운영중', customers: 28, capacity: '8,400 kW', kpxId: 'KPX-RSC-2402', region: '수도권', lastCheck: '정상' },
  { id: 'RSC-003', name: '플러스DR 전국', type: '플러스DR', status: '운영중', customers: 34, capacity: '12,200 kW', kpxId: 'KPX-RSC-2403', region: '전국', lastCheck: '정상' },
  { id: 'RSC-004', name: '주파수DR 전국', type: '주파수DR', status: '시험중', customers: 21, capacity: '18,900 kW', kpxId: '-', region: '육지권', lastCheck: '시험중' },
  { id: 'RSC-005', name: '제주DR A', type: '제주DR', status: '운영중', customers: 15, capacity: '1,800 kW', kpxId: 'KPX-RSC-2405', region: '제주권', lastCheck: '장애' },
  { id: 'RSC-006', name: '중소형DR 비수도권 A', type: '중소형DR', status: '활성대기', customers: 8, capacity: '2,400 kW', kpxId: '-', region: '비수도권', lastCheck: '대기' },
]

const statusColor: Record<string, string> = {
  '운영중': 'badge-success', '시험중': 'badge-warning', '활성대기': 'badge-accent', '일시중단': 'badge-muted', '자격박탈': 'badge-danger', '해지': 'badge-muted'
}

const connectionLog = [
  { time: '14:32:01', type: 'OpenADR', event: 'EiEvent 수신 — EVT-2024-031', status: '성공' },
  { time: '14:32:04', event: 'RSC-001 자원 배분 완료 — 142개 고객', status: '성공', type: '내부' },
  { time: '14:32:08', event: 'SMS 발송 — 142건', status: '성공', type: '알림' },
  { time: '14:35:00', event: 'EiReport 응답 전송 (KPX)', status: '성공', type: 'OpenADR' },
  { time: '14:40:12', event: 'RSC-005 계측기 통신 오류', status: '오류', type: '장애' },
]

type Props = { activeNav: string }

export default function ResourceManagement({ activeNav }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState({ type: '', status: '' })

  const filtered = resources.filter(r =>
    (!filter.type || r.type === filter.type) &&
    (!filter.status || r.status === filter.status)
  )

  // KPX 제출
  if (activeNav === 'resource-kpx') {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>KPX 제출</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>수요반응자원 등록신청서 자동 생성 및 제출</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: '수요반응자원 등록신청서', types: ['표준DR','H-표준DR','중소형DR','H-중소형DR'], icon: '📋' },
            { label: '수요반응자원 등록신청서', types: ['제주DR','H-제주DR'], icon: '📋' },
            { label: '수요반응자원 등록신청서', types: ['주파수DR'], icon: '📋' },
            { label: '수요반응자원 등록신청서', types: ['플러스DR'], icon: '📋' },
            { label: '수요반응자원 등록신청서', types: ['국민DR'], icon: '📋' },
            { label: '수요반응참여고객 등록신청서', types: ['표준·H-표준·중소형·H-중소형·제주·H-제주DR'], icon: '👥' },
            { label: '수요반응참여고객 등록신청서', types: ['국민DR'], icon: '👥' },
            { label: '수요반응참여고객 등록신청서', types: ['주파수DR'], icon: '👥' },
            { label: '수요반응참여고객 등록신청서', types: ['플러스DR'], icon: '👥' },
          ].map((doc, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{doc.label}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {doc.types.map(t => <span key={t} className="badge badge-muted" style={{ fontSize: 10 }}>{t}</span>)}
                </div>
              </div>
              <button className="btn btn-secondary" style={{ fontSize: 11, padding: '5px 10px', flexShrink: 0 }}>엑셀 생성</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>연동 점검 (pre-check)</div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>KPX 제출 전 필수 항목 자동 검증</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { item: '참여고객 원장 완결성', result: '통과', status: 'success' },
              { item: '계량기 번호 유효성', result: '통과', status: 'success' },
              { item: '의무감축용량 기준치 충족', result: '통과', status: 'success' },
              { item: 'OpenADR 연동 상태', result: '정상', status: 'success' },
            ].map(c => (
              <div key={c.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.item}</span>
                <span className={`badge badge-${c.status}`}>{c.result}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 14 }}>전체 점검 실행</button>
        </div>
      </div>
    )
  }

  // Resource create
  if (activeNav === 'resource-create') {
    return (
      <div style={{ padding: 24, maxWidth: 640 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>자원 생성</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>자원 기본 정보</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: '자원명 *', ph: '표준DR 수도권 B' },
                { label: 'DR 유형 *', ph: '', type: 'select' },
                { label: '지역구분 *', ph: '', type: 'select2' },
                { label: '의무감축용량 (kW) *', ph: '0' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="select">
                      <option>표준DR</option><option>중소형DR</option><option>국민DR</option>
                      <option>플러스DR</option><option>주파수DR</option><option>제주DR</option>
                    </select>
                  ) : f.type === 'select2' ? (
                    <select className="select">
                      <option>수도권</option><option>비수도권</option><option>제주권</option>
                    </select>
                  ) : (
                    <input className="input" placeholder={f.ph} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary">취소</button>
            <button className="btn btn-primary">자원 생성</button>
          </div>
        </div>
      </div>
    )
  }

  // Resource list (default)
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>자원 관리</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>전체 {resources.length}개 자원 그룹</p>
        </div>
        <button className="btn btn-primary">+ 자원 생성</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: '운영중', value: '3', color: 'var(--success)' },
          { label: '시험중', value: '1', color: 'var(--warning)' },
          { label: '활성대기', value: '1', color: 'var(--accent)' },
          { label: '계측기 장애', value: '4', color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color, fontSize: 20 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select className="select" style={{ maxWidth: 130 }} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))}>
          <option value="">전체 유형</option>
          {['국민DR','표준DR','중소형DR','플러스DR','주파수DR','제주DR'].map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="select" style={{ maxWidth: 130 }} onChange={e => setFilter(p => ({ ...p, status: e.target.value }))}>
          <option value="">전체 상태</option>
          {['운영중','시험중','활성대기','일시중단'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th>자원 ID</th><th>자원명</th><th>DR 유형</th><th>참여고객</th><th>의무감축용량</th><th>KPX ID</th><th>지역</th><th>계측 상태</th><th>상태</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{r.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</td>
                <td><span className="badge badge-accent">{r.type}</span></td>
                <td>{r.customers}명</td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{r.capacity}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{r.kpxId}</td>
                <td>{r.region}</td>
                <td>
                  <span className={`badge ${r.lastCheck === '정상' ? 'badge-success' : r.lastCheck === '장애' ? 'badge-danger' : 'badge-muted'}`}>
                    {r.lastCheck}
                  </span>
                </td>
                <td><span className={`badge ${statusColor[r.status]}`}>{r.status}</span></td>
                <td><button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>상세</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Connection log */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>OpenADR 연동 실시간 로그</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {connectionLog.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '5px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{l.time}</span>
              <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 10, fontFamily: 'sans-serif', fontWeight: 600,
                background: l.type === 'OpenADR' ? 'var(--accent-dim)' : l.type === '장애' ? 'var(--danger-dim)' : 'var(--bg-3)',
                color: l.type === 'OpenADR' ? 'var(--accent)' : l.type === '장애' ? 'var(--danger)' : 'var(--text-muted)',
                flexShrink: 0
              }}>{l.type}</span>
              <span style={{ color: l.status === '오류' ? 'var(--danger)' : 'var(--text-secondary)', flex: 1 }}>{l.event}</span>
              <span className={`badge ${l.status === '성공' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 10 }}>{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
