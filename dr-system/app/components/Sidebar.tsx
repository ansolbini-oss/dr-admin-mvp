'use client'
import { useState } from 'react'

type Props = { activeNav: string; setActiveNav: (v: string) => void }

type NavGroup = {
  id: string
  label: string
  children: { id: string; label: string; children?: { id: string; label: string }[] }[]
}

const NAV: NavGroup[] = [
  {
    id: 'monitoring', label: '모니터링·대시보드',
    children: [{ id: 'dashboard', label: '대시보드' }]
  },
  {
    id: 'lead', label: '리드/사전검증',
    children: [
      { id: 'lead-list', label: '리드 관리', children: [
        { id: 'lead-register', label: '리드 등록' },
        { id: 'lead-list', label: '리드 목록' },
      ]},
      { id: 'lead-verify', label: '사전검증', children: [
        { id: 'lead-verify-list', label: '검증 대상 조회' },
        { id: 'lead-verify-detail', label: '검증 실행' },
      ]},
    ]
  },
  {
    id: 'customer', label: '참여고객관리',
    children: [
      { id: 'contract', label: '계약 관리', children: [
        { id: 'contract-list', label: '계약 대상 조회' },
        { id: 'contract-sign', label: '계약서 발송·서명' },
      ]},
      { id: 'customer-ledger', label: '고객 원장', children: [
        { id: 'customer-register', label: '참여고객 등록' },
        { id: 'customer-list', label: '고객 목록 조회' },
        { id: 'customer-detail', label: '고객 상세' },
      ]},
      { id: 'customer-resource', label: '고객 자원화', children: [
        { id: 'customer-map', label: '고객-자원 매핑' },
      ]},
    ]
  },
  {
    id: 'resource', label: '자원관리',
    children: [
      { id: 'resource-list', label: '자원 조회' },
      { id: 'resource-create', label: '자원 생성' },
      { id: 'resource-kpx', label: 'KPX 제출' },
    ]
  },
  {
    id: 'trial', label: '시험관리',
    children: [
      { id: 'trial-plan', label: '시험 계획' },
      { id: 'trial-monitor', label: '시험 모니터링' },
      { id: 'trial-result', label: '시험 결과' },
    ]
  },
  {
    id: 'event', label: '이행검증',
    children: [
      { id: 'event-list', label: '이벤트 조회' },
      { id: 'event-analysis', label: '이행률 분석' },
      { id: 'event-verify', label: '미이행 검증' },
      { id: 'event-report', label: '검증 리포트' },
    ]
  },
  {
    id: 'settlement', label: '정산관리',
    children: [
      { id: 'settlement-upload', label: '정산요청서 접수' },
      { id: 'settlement-calc', label: '고객별 정산 산출' },
      { id: 'settlement-invoice', label: '세금계산서·입금' },
      { id: 'settlement-payout', label: '지급 지시·확정' },
      { id: 'settlement-data', label: 'CBL·감축 평가' },
    ]
  },
  {
    id: 'system', label: '운영관리·시스템',
    children: [
      { id: 'system-notify', label: '알림 관리' },
      { id: 'system-log', label: '감사 로그' },
      { id: 'system-openADR', label: 'OpenADR 연동' },
      { id: 'system-account', label: '계정·권한 관리' },
      { id: 'system-settings', label: '환경 설정' },
    ]
  },
]

export default function Sidebar({ activeNav, setActiveNav }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setCollapsed(p => ({ ...p, [id]: !p[id] }))

  const isActive = (id: string) => activeNav === id || activeNav.startsWith(id + '-')

  return (
    <aside style={{
      width: 220, minWidth: 220, height: '100vh', overflow: 'auto',
      background: 'var(--bg-2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'white'
          }}>DR</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>DR 운영시스템</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>식스티헤르츠</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {NAV.map(group => (
          <div key={group.id} style={{ marginBottom: 4 }}>
            <div
              onClick={() => toggle(group.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '5px 8px', borderRadius: 5, cursor: 'pointer',
                color: isActive(group.id) ? 'var(--text-primary)' : 'var(--text-muted)',
                fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'color 0.15s'
              }}
            >
              <span>{group.label}</span>
              <span style={{ fontSize: 10, transition: 'transform 0.15s', transform: collapsed[group.id] ? 'rotate(-90deg)' : 'none' }}>▾</span>
            </div>

            {!collapsed[group.id] && (
              <div style={{ paddingLeft: 6 }}>
                {group.children.map(item => (
                  <div key={item.id}>
                    {item.children ? (
                      <>
                        <div style={{
                          padding: '5px 10px', fontSize: 12, color: 'var(--text-muted)',
                          fontWeight: 500, marginTop: 2
                        }}>{item.label}</div>
                        <div style={{ paddingLeft: 8 }}>
                          {item.children.map(sub => (
                            <div
                              key={sub.id}
                              className={`sidebar-link ${activeNav === sub.id ? 'active' : ''}`}
                              onClick={() => setActiveNav(sub.id)}
                            >
                              <span style={{ fontSize: 11, color: 'inherit', opacity: 0.6 }}>—</span>
                              {sub.label}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div
                        className={`sidebar-link ${activeNav === item.id ? 'active' : ''}`}
                        onClick={() => setActiveNav(item.id)}
                      >
                        {item.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%', background: 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: 'var(--accent)'
          }}>관</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>운영관리자</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>admin@60hz.io</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
