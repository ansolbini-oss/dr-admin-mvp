'use client'
import { useState } from 'react'

const leads = [
  { id: 'LD-0048', name: '(주)광명에너지', type: '표준DR', status: '사전검증중', capacity: '500 kW', contact: '김철수', region: '수도권', date: '2026-03-15', assignee: '이민지' },
  { id: 'LD-0047', name: '강남물산', type: '국민DR', status: '인터뷰완료', capacity: '45 kW', contact: '박민준', region: '수도권', date: '2026-03-14', assignee: '최수현' },
  { id: 'LD-0046', name: '제주클린에너지', type: '제주DR', status: '리드등록', capacity: '120 kW', contact: '홍길동', region: '제주권', date: '2026-03-13', assignee: '미배정' },
  { id: 'LD-0045', name: '부산물류센터', type: '플러스DR', status: '적격판정', capacity: '800 kW', contact: '이수진', region: '비수도권', date: '2026-03-12', assignee: '박준호' },
  { id: 'LD-0044', name: '서울아파트관리단', type: '국민DR', status: '탈락', capacity: '30 kW', contact: '김영희', region: '수도권', date: '2026-03-10', assignee: '이민지' },
  { id: 'LD-0043', name: '인천냉동창고', type: '표준DR', status: '보완요청', capacity: '350 kW', contact: '정대호', region: '수도권', date: '2026-03-09', assignee: '최수현' },
  { id: 'LD-0042', name: '대전제조공장', type: '주파수DR', status: '계약전환', capacity: '1,200 kW', contact: '오민석', region: '비수도권', date: '2026-03-08', assignee: '박준호' },
]

const statusColor: Record<string, string> = {
  '리드등록': 'badge-muted', '인터뷰완료': 'badge-accent', '사전검증중': 'badge-warning',
  '적격판정': 'badge-success', '보완요청': 'badge-warning', '탈락': 'badge-danger', '계약전환': 'badge-purple'
}

const verifySteps = [
  { id: 'ext', label: '외부 데이터 검증', status: 'done', result: '통과' },
  { id: 'rrmse', label: 'RRMSE 분석', status: 'done', result: '0.124 (적합)' },
  { id: 'cbl', label: 'CBL 분석', status: 'running', result: '분석 중...' },
  { id: 'infra', label: '계량 인프라 검증', status: 'pending', result: '대기' },
]

type Props = { activeNav: string }

export default function LeadManagement({ activeNav }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState({ type: '', status: '', keyword: '' })
  const [form, setForm] = useState({ name: '', bizNo: '', rep: '', phone: '', email: '', address: '', type: '', capacity: '', hasMeter: '' })

  const filtered = leads.filter(l =>
    (!filter.type || l.type === filter.type) &&
    (!filter.status || l.status === filter.status) &&
    (!filter.keyword || l.name.includes(filter.keyword) || l.id.includes(filter.keyword))
  )

  if (activeNav === 'lead-register' || showForm) {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button className="btn btn-ghost" onClick={() => setShowForm(false)} style={{ fontSize: 12 }}>← 목록</button>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>리드 등록</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>DR 참여 의향 고객 기본 정보 등록</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 기본정보 */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text-primary)' }}>기본 정보</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: '사업자명 *', key: 'name', placeholder: '(주)○○에너지' },
                { label: '사업자등록번호 *', key: 'bizNo', placeholder: '000-00-00000' },
                { label: '대표자명 *', key: 'rep', placeholder: '홍길동' },
                { label: '담당자 연락처 *', key: 'phone', placeholder: '010-0000-0000' },
                { label: '이메일 *', key: 'email', placeholder: 'contact@company.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <input className="input" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>사업장 주소 *</label>
                <input className="input" placeholder="도로명 주소 검색 (카카오 API)" />
              </div>
            </div>
          </div>

          {/* DR 정보 */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text-primary)' }}>DR 참여 정보</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>DR 유형 *</label>
                <select className="select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option value="">선택</option>
                  <option>국민DR</option><option>표준DR</option><option>중소형DR</option>
                  <option>플러스DR</option><option>주파수DR</option><option>제주DR</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>전력 계약 용량 (kW)</label>
                <input className="input" type="number" placeholder="0" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>계량기 보유 여부</label>
                <select className="select">
                  <option value="">선택</option>
                  <option>AMI 보유</option><option>RTU 보유</option><option>미보유</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: 'var(--bg-3)', borderRadius: 6, fontSize: 12, color: 'var(--text-muted)' }}>
              ※ 국민DR 최소 용량: 1 kW · 표준DR: 300 kW 이상 · 플러스DR: 500 kW 이상 · 주파수DR: 1,000 kW 이상
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>취소</button>
            <button className="btn btn-primary" onClick={() => { alert('접수번호 LD-0049 발급 완료'); setShowForm(false) }}>
              등록 및 접수번호 발급
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (activeNav === 'lead-verify-detail') {
    const lead = leads.find(l => l.id === (selected || 'LD-0048')) || leads[0]
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>사전검증 실행</h1>
          <span className="badge badge-accent">{lead.name}</span>
          <span className="badge badge-muted">{lead.type}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {verifySteps.map((step, i) => (
              <div key={step.id} className="card" style={{ borderLeft: `3px solid ${step.status === 'done' ? 'var(--success)' : step.status === 'running' ? 'var(--accent)' : 'var(--border)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      background: step.status === 'done' ? 'var(--success-dim)' : step.status === 'running' ? 'var(--accent-dim)' : 'var(--bg-3)',
                      color: step.status === 'done' ? 'var(--success)' : step.status === 'running' ? 'var(--accent)' : 'var(--text-muted)'
                    }}>
                      {step.status === 'done' ? '✓' : i + 1}
                    </span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{step.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>결과: {step.result}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {step.status === 'done' && <span className="badge badge-success">완료</span>}
                    {step.status === 'running' && <span className="badge badge-accent">진행중</span>}
                    {step.status === 'pending' && <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>실행</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>CBL 유형 설정</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>기준부하 산정 방식</div>
              {['Max(4/5)', 'Mid(6/10)'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13 }}>
                  <input type="radio" name="cbl" defaultChecked={opt === 'Max(4/5)'} />
                  <span style={{ color: 'var(--text-secondary)' }}>{opt}</span>
                </label>
              ))}
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, marginBottom: 6 }}>SAA 적용</div>
              {['적용', '미적용'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13 }}>
                  <input type="radio" name="saa" defaultChecked={opt === '미적용'} />
                  <span style={{ color: 'var(--text-secondary)' }}>{opt}</span>
                </label>
              ))}
              <div style={{ marginTop: 10, padding: 8, background: 'var(--accent-dim)', borderRadius: 5, fontSize: 11, color: 'var(--accent)' }}>
                권장: Max(4/5) · SAA 미적용
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>수익배분율 (임시)</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input className="input" type="number" defaultValue="70" style={{ width: 70 }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>% / 30%</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>고객 / 식스티헤르츠 배분</div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              검증 결과 저장
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default: lead list
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>리드 목록</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>총 {leads.length}건</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ 리드 등록</button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 16, padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input className="input" placeholder="사업자명, 접수번호 검색" style={{ maxWidth: 220 }}
            value={filter.keyword} onChange={e => setFilter(p => ({ ...p, keyword: e.target.value }))} />
          <select className="select" style={{ maxWidth: 140 }} value={filter.type} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))}>
            <option value="">전체 유형</option>
            {['국민DR','표준DR','중소형DR','플러스DR','주파수DR','제주DR'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="select" style={{ maxWidth: 140 }} value={filter.status} onChange={e => setFilter(p => ({ ...p, status: e.target.value }))}>
            <option value="">전체 상태</option>
            {['리드등록','인터뷰완료','사전검증중','적격판정','보완요청','탈락','계약전환'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-ghost" onClick={() => setFilter({ type: '', status: '', keyword: '' })} style={{ fontSize: 12 }}>초기화</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>접수번호</th><th>사업자명</th><th>DR 유형</th><th>계약용량</th><th>지역</th><th>담당자</th><th>상태</th><th>등록일</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(l.id)}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{l.id}</td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{l.name}</td>
                <td><span className="badge badge-accent">{l.type}</span></td>
                <td style={{ color: 'var(--text-primary)' }}>{l.capacity}</td>
                <td>{l.region}</td>
                <td>{l.assignee === '미배정' ? <span style={{ color: 'var(--danger)', fontSize: 12 }}>미배정</span> : l.assignee}</td>
                <td><span className={`badge ${statusColor[l.status]}`}>{l.status}</span></td>
                <td style={{ fontSize: 11 }}>{l.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>상세</button>
                    {l.status === '적격판정' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}>계약전환</button>}
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
