'use client'
import { useState } from 'react'

const settlements = [
  { id: 'STL-2026-03', event: 'EVT-2024-031', type: '국민DR', kpxAmount: '₩48,180,000', customers: 142, status: '정산확정', invoiceStatus: '발행완료', payStatus: '지급완료' },
  { id: 'STL-2026-02', event: 'EVT-2024-025', type: '표준DR', kpxAmount: '₩89,400,000', customers: 28, status: '지급중', invoiceStatus: '발행완료', payStatus: '지급중' },
  { id: 'STL-2026-01', event: 'EVT-2024-018', type: '플러스DR', kpxAmount: '₩122,000,000', customers: 34, status: '검증중', invoiceStatus: '미발행', payStatus: '대기' },
]

const customerSettlement = [
  { id: 'CUS-0234', name: '(주)광명에너지', reduction: '500 kW', rate: '94.2%', amount: '₩3,240,000', share: '₩2,268,000', status: '지급완료' },
  { id: 'CUS-0232', name: '부산물류센터', reduction: '800 kW', rate: '91.5%', amount: '₩5,184,000', share: '₩3,732,480', status: '지급완료' },
  { id: 'CUS-0233', name: '대전제조공장', reduction: '1,200 kW', rate: '98.3%', amount: '₩7,782,000', share: '₩5,834,100', status: '지급중' },
  { id: 'CUS-0229', name: '제주클린에너지', reduction: '120 kW', rate: '88.4%', amount: '₩778,000', share: '₩583,500', status: '대기' },
]

type Props = { activeNav: string }

export default function SettlementManagement({ activeNav }: Props) {
  const [uploadFile, setUploadFile] = useState<string | null>(null)

  if (activeNav === 'settlement-upload') {
    return (
      <div style={{ padding: 24, maxWidth: 760 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>KPX 정산요청서 접수</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>KPX 발행 정산요청서 업로드 후 자동 파싱·검증</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px', border: '2px dashed var(--border)', borderRadius: 10 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>정산요청서 파일 업로드</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>KPX 발행 엑셀(.xlsx) 또는 PDF 형식</div>
            <button className="btn btn-primary" onClick={() => setUploadFile('KPX_정산요청서_2026-03.xlsx')}>파일 선택</button>
            {uploadFile && (
              <div style={{ marginTop: 14, padding: '8px 16px', background: 'var(--success-dim)', borderRadius: 6, fontSize: 12, color: 'var(--success)', display: 'inline-block' }}>
                ✓ {uploadFile}
              </div>
            )}
          </div>

          {uploadFile && (
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>파싱·검증 결과</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { item: '파일 형식 검증', result: '정상', status: 'success' },
                  { item: '이벤트 ID 매핑', result: 'EVT-2024-031 → 연결 완료', status: 'success' },
                  { item: 'KPX 정산 금액', result: '₩48,180,000', status: 'success' },
                  { item: '감축량 일치 검증', result: '4,015 kW (내부 데이터 일치)', status: 'success' },
                  { item: '이행률 일치 검증', result: '94.2% (허용 오차 내)', status: 'success' },
                ].map(c => (
                  <div key={c.item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.item}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.result}</span>
                      <span className={`badge badge-${c.status}`}>{c.status === 'success' ? '통과' : '오류'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-primary">정산 회차 생성</button>
                <button className="btn btn-secondary">취소</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeNav === 'settlement-calc') {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>고객별 정산 산출</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>STL-2026-03 · 국민DR · EVT-2024-031</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ fontSize: 12 }}>정산 리포트 다운로드</button>
            <button className="btn btn-primary" style={{ fontSize: 12 }}>정산 확정</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'KPX 수령 금액', value: '₩48,180,000', color: 'var(--text-primary)' },
            { label: '고객 지급 합계', value: '₩33,726,000', color: 'var(--success)' },
            { label: '당사 수수료', value: '₩14,454,000', color: 'var(--accent)' },
            { label: '조정금', value: '₩0', color: 'var(--text-muted)' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: s.color, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>정산 공식 (활성 버전 v2.4)</div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-3)', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            고객 정산금 = (감축량 × 단가) × 이행률 × 수익배분율<br />
            조정금 = 패널티 금액 - 면제 승인액
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>고객 ID</th><th>사업자명</th><th>감축량</th><th>이행률</th><th>정산금(합계)</th><th>고객 배분</th><th>상태</th><th></th></tr></thead>
            <tbody>
              {customerSettlement.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{c.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                  <td>{c.reduction}</td>
                  <td style={{ color: parseFloat(c.rate) >= 90 ? 'var(--success)' : 'var(--warning)', fontWeight: 700 }}>{c.rate}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.amount}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{c.share}</td>
                  <td>
                    <span className={`badge ${c.status === '지급완료' ? 'badge-success' : c.status === '지급중' ? 'badge-accent' : 'badge-muted'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td><button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>조정금 입력</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (activeNav === 'settlement-invoice') {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>세금계산서·입금 관리</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {settlements.map(s => (
            <div key={s.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{s.id}</span>
                    <span className="badge badge-accent">{s.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.event} · KPX 수령: <strong style={{ color: 'var(--text-primary)' }}>{s.kpxAmount}</strong></div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>세금계산서</div>
                    <span className={`badge ${s.invoiceStatus === '발행완료' ? 'badge-success' : 'badge-muted'}`}>{s.invoiceStatus}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>입금·지급</div>
                    <span className={`badge ${s.payStatus === '지급완료' ? 'badge-success' : s.payStatus === '지급중' ? 'badge-accent' : 'badge-muted'}`}>{s.payStatus}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {s.invoiceStatus === '미발행' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>세금계산서 발행 요청</button>}
                    <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}>입금 확인</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (activeNav === 'settlement-payout') {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>지급 지시·확정</h1>
          <button className="btn btn-primary">일괄 지급 지시</button>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>고객명</th><th>지급 금액</th><th>지급 방식</th><th>지급 상태</th><th></th></tr></thead>
            <tbody>
              {customerSettlement.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                  <td style={{ fontWeight: 600, color: 'var(--success)' }}>{c.share}</td>
                  <td style={{ fontSize: 12 }}>계좌이체</td>
                  <td>
                    <span className={`badge ${c.status === '지급완료' ? 'badge-success' : c.status === '지급중' ? 'badge-accent' : 'badge-muted'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.status === '대기' && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 8px' }}>지급 지시</button>}
                    {c.status === '지급중' && <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>지급 확정</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (activeNav === 'settlement-data') {
    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>CBL·감축 평가 관리</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>CBL 산정 현황</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'CBL 버전', value: 'v3.2 (2026-01 적용)' },
                { label: '적용 방식', value: 'Max(4/5)' },
                { label: 'SAA 적용', value: '미적용' },
                { label: '마지막 갱신', value: '2026-02-28' },
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 14px', background: 'var(--bg-3)', borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-primary">CBL 재산정</button>
              <button className="btn btn-secondary">CBL 검증 실행</button>
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>정산 공식 버전 관리</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { ver: 'v2.4', date: '2026-01-01', status: '활성', desc: '패널티 기준 상향 (80%→85%)' },
                { ver: 'v2.3', date: '2025-07-01', status: '비활성', desc: 'SAA 방식 추가' },
                { ver: 'v2.2', date: '2025-01-01', status: '비활성', desc: 'RRMSE 기준 0.20 도입' },
              ].map(v => (
                <div key={v.ver} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-3)', borderRadius: 6 }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: v.status === '활성' ? 'var(--success)' : 'var(--text-muted)', marginRight: 10 }}>{v.ver}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{v.desc}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.date}</span>
                    <span className={`badge ${v.status === '활성' ? 'badge-success' : 'badge-muted'}`}>{v.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Settlement list (default)
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>정산 관리</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>KPX 정산요청서 접수 → 고객 배분 → 지급 완료</p>
        </div>
        <button className="btn btn-primary">정산요청서 업로드</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: '당월 KPX 수령', value: '₩221M', color: 'var(--text-primary)' },
          { label: '고객 지급 합계', value: '₩154.7M', color: 'var(--success)' },
          { label: '당사 수수료 합계', value: '₩66.3M', color: 'var(--accent)' },
          { label: '미지급 건수', value: '8건', color: 'var(--warning)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color, fontSize: 18 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>정산 회차</th><th>이벤트</th><th>DR 유형</th><th>KPX 금액</th><th>참여 고객</th><th>정산 상태</th><th>세금계산서</th><th>지급</th><th></th></tr></thead>
          <tbody>
            {settlements.map(s => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)' }}>{s.id}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{s.event}</td>
                <td><span className="badge badge-accent">{s.type}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.kpxAmount}</td>
                <td>{s.customers}명</td>
                <td>
                  <span className={`badge ${s.status === '정산확정' ? 'badge-success' : s.status === '지급중' ? 'badge-accent' : 'badge-warning'}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${s.invoiceStatus === '발행완료' ? 'badge-success' : 'badge-muted'}`}>{s.invoiceStatus}</span>
                </td>
                <td>
                  <span className={`badge ${s.payStatus === '지급완료' ? 'badge-success' : s.payStatus === '지급중' ? 'badge-accent' : 'badge-muted'}`}>
                    {s.payStatus}
                  </span>
                </td>
                <td><button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>상세</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
