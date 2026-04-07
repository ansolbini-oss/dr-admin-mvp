'use client'
import { useState } from 'react'

const customers = [
  { id: 'CUS-0234', name: '(주)광명에너지', type: '표준DR', status: '운영중', capacity: '500 kW', region: '수도권', customerNo: 'KPX-234-001', meterNo: 'AMI-23401', cbl: 'Max(4/5)', revenue: '70/30', date: '2025-11-10' },
  { id: 'CUS-0233', name: '대전제조공장', type: '주파수DR', status: '운영중', capacity: '1,200 kW', region: '비수도권', customerNo: 'KPX-233-001', meterNo: 'RTU-23301', cbl: 'Mid(6/10)', revenue: '75/25', date: '2025-10-22' },
  { id: 'CUS-0232', name: '부산물류센터', type: '플러스DR', status: '운영중', capacity: '800 kW', region: '비수도권', customerNo: 'KPX-232-001', meterNo: 'AMI-23201', cbl: 'Max(4/5)', revenue: '72/28', date: '2025-10-05' },
  { id: 'CUS-0231', name: '강남물산', type: '국민DR', status: '온보딩중', capacity: '45 kW', region: '수도권', customerNo: '-', meterNo: 'AMI-23101', cbl: 'Mid(6/10)', revenue: '80/20', date: '2026-03-14' },
  { id: 'CUS-0230', name: '인천냉동창고', type: '표준DR', status: '시험중', capacity: '350 kW', region: '수도권', customerNo: 'KPX-230-001', meterNo: 'RTU-23001', cbl: 'Max(4/5)', revenue: '70/30', date: '2026-01-15' },
  { id: 'CUS-0229', name: '제주클린에너지', type: '제주DR', status: '일시중단', capacity: '120 kW', region: '제주권', customerNo: 'KPX-229-001', meterNo: 'AMI-22901', cbl: 'Mid(6/10)', revenue: '75/25', date: '2025-09-01' },
]

const statusColor: Record<string, string> = {
  '운영중': 'badge-success', '온보딩중': 'badge-accent', '시험중': 'badge-warning', '일시중단': 'badge-muted', '자격박탈': 'badge-danger'
}

const contracts = [
  { id: 'CON-0045', name: '(주)광명에너지', type: '표준DR', step: '서명완료', date: '2026-03-10' },
  { id: 'CON-0044', name: '강남물산', type: '국민DR', step: '서명대기', date: '2026-03-14' },
  { id: 'CON-0043', name: '제주신재생', type: '제주DR', step: '서류검토', date: '2026-03-12' },
]

type Props = { activeNav: string }

export default function CustomerManagement({ activeNav }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('info')
  const [filter, setFilter] = useState({ type: '', status: '', keyword: '' })

  const filtered = customers.filter(c =>
    (!filter.type || c.type === filter.type) &&
    (!filter.status || c.status === filter.status) &&
    (!filter.keyword || c.name.includes(filter.keyword))
  )

  // Customer detail view
  if ((activeNav === 'customer-detail' || selectedCustomer) && activeNav !== 'customer-register' && activeNav !== 'customer-map') {
    const c = customers.find(c => c.id === selectedCustomer) || customers[0]
    return (
      <div style={{ padding: 24, maxWidth: 960 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button className="btn btn-ghost" onClick={() => setSelectedCustomer(null)} style={{ fontSize: 12 }}>← 목록</button>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</h1>
          <span className="badge badge-accent">{c.type}</span>
          <span className={`badge ${statusColor[c.status]}`}>{c.status}</span>
        </div>

        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
          {['info','contract','settlement','history'].map(t => (
            <div key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {{ info: '기본 정보', contract: '계약 이력', settlement: '정산 이력', history: '온보딩 타임라인' }[t]}
            </div>
          ))}
        </div>

        {activeTab === 'info' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>기본 정보</div>
              {[['사업자명', c.name], ['고객 ID', c.id], ['DR 유형', c.type], ['지역구분', c.region], ['등록일', c.date]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>전력 계약 정보</div>
              {[['계약용량', c.capacity], ['고객번호(한전)', c.customerNo], ['계량기번호', c.meterNo], ['CBL 방식', c.cbl], ['수익배분율(고객/당사)', c.revenue]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>온보딩 타임라인</div>
            {[
              { date: '2025-10-01', label: '리드 등록', detail: '담당자: 이민지', done: true },
              { date: '2025-10-12', label: '인터뷰 완료', detail: '결과: 참여 유력', done: true },
              { date: '2025-10-20', label: '사전검증 완료', detail: 'RRMSE: 0.124 · CBL 적합', done: true },
              { date: '2025-11-01', label: '계약 서명 완료', detail: '전자서명', done: true },
              { date: '2025-11-10', label: '운영 시작', detail: '모니터링 계정 생성 완료', done: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, position: 'relative' }}>
                {i < 4 && <div style={{ position: 'absolute', left: 7, top: 20, width: 1, height: '100%', background: 'var(--border)' }} />}
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: item.done ? 'var(--success)' : 'var(--border)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.date} · {item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settlement' && (
          <div className="card" style={{ padding: 0 }}>
            <table>
              <thead><tr><th>정산 회차</th><th>이벤트 ID</th><th>감축량</th><th>정산금</th><th>고객 배분</th><th>상태</th></tr></thead>
              <tbody>
                {[
                  { round: '2026-03', evt: 'EVT-030', reduction: '3,600 kW', total: '₩2,340,000', customer: '₩1,638,000', status: '지급완료' },
                  { round: '2026-02', evt: 'EVT-025', reduction: '2,850 kW', total: '₩1,852,500', customer: '₩1,296,750', status: '지급완료' },
                  { round: '2026-01', evt: 'EVT-018', reduction: '4,100 kW', total: '₩2,665,000', customer: '₩1,865,500', status: '지급완료' },
                ].map(r => (
                  <tr key={r.round}>
                    <td>{r.round}</td><td style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{r.evt}</td>
                    <td>{r.reduction}</td><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.total}</td>
                    <td style={{ color: 'var(--success)' }}>{r.customer}</td>
                    <td><span className="badge badge-success">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  // Contract management
  if (activeNav === 'contract-list' || activeNav === 'contract-sign') {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>계약 관리</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>사전검증 통과 고객 계약 진행</p>
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>계약 ID</th><th>사업자명</th><th>DR 유형</th><th>진행 단계</th><th>시작일</th><th></th></tr></thead>
            <tbody>
              {contracts.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{c.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                  <td><span className="badge badge-accent">{c.type}</span></td>
                  <td>
                    <span className={`badge ${c.step === '서명완료' ? 'badge-success' : c.step === '서명대기' ? 'badge-warning' : 'badge-muted'}`}>{c.step}</span>
                  </td>
                  <td>{c.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>서류 업로드</button>
                      {c.step === '서명대기' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}>서명 재발송</button>}
                      {c.step === '서명완료' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}>계약 완료 처리</button>}
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

  // Customer register form
  if (activeNav === 'customer-register') {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>참여고객 등록</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>사전검증 통과 고객 원장 등록 · 등록신청서 9종 전 필드 포함</p>
        </div>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>DR 유형 선택</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['표준DR','중소형DR','플러스DR','주파수DR','제주DR','국민DR'].map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', fontSize: 13 }}>
                <input type="radio" name="regType" /> {t}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 16, background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          유형 선택 후 해당 유형의 분기 필드가 표시됩니다:<br />
          · 표준/중소형DR: 수도권/비수도권 구분, 의무감축용량, 전력부하감축량 산정방식, 자가용발전기 정보<br />
          · 주파수DR: 기준주파수 단계(1·3단계 / 2·4·5단계), 계량방식 3종<br />
          · 플러스DR: 육지권 12개 세부지역, 증대가능용량<br />
          · 제주DR: EV 여부, H-제주DR 구분<br />
          · 국민DR: 수도권/비수도권/제주권 구분
        </div>
      </div>
    )
  }

  // Customer map
  if (activeNav === 'customer-map') {
    return (
      <div style={{ padding: 24, maxWidth: 700 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>고객-자원 매핑</h1>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>매핑 설정</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>참여고객 선택</label>
              <select className="select">
                {customers.map(c => <option key={c.id}>{c.id} — {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>자원 그룹 선택</label>
              <select className="select">
                <option>RSC-G001 — 국민DR 수도권 A</option>
                <option>RSC-G002 — 표준DR 수도권 A</option>
                <option>RSC-G003 — 플러스DR 전국</option>
                <option>RSC-G004 — 주파수DR 전국</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>중복 검증 후 매핑 등록</button>
          </div>
        </div>
      </div>
    )
  }

  // Default: customer list
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>참여고객 목록</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>총 {customers.length}건</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>KPX 엑셀 다운로드</button>
          <button className="btn btn-primary">+ 고객 등록</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16, padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input className="input" placeholder="이름·사업장 검색" style={{ maxWidth: 200 }}
            value={filter.keyword} onChange={e => setFilter(p => ({ ...p, keyword: e.target.value }))} />
          <select className="select" style={{ maxWidth: 130 }} value={filter.type} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))}>
            <option value="">전체 유형</option>
            {['국민DR','표준DR','중소형DR','플러스DR','주파수DR','제주DR'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="select" style={{ maxWidth: 130 }} value={filter.status} onChange={e => setFilter(p => ({ ...p, status: e.target.value }))}>
            <option value="">전체 상태</option>
            {['운영중','온보딩중','시험중','일시중단','자격박탈'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th>고객 ID</th><th>사업자명</th><th>DR 유형</th><th>계약용량</th><th>지역</th><th>CBL</th><th>수익배분</th><th>상태</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{c.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                <td><span className="badge badge-accent">{c.type}</span></td>
                <td>{c.capacity}</td>
                <td>{c.region}</td>
                <td style={{ fontSize: 12 }}>{c.cbl}</td>
                <td style={{ fontSize: 12 }}>{c.revenue}</td>
                <td><span className={`badge ${statusColor[c.status]}`}>{c.status}</span></td>
                <td>
                  <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => setSelectedCustomer(c.id)}>
                    상세 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
