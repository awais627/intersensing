import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { ThemeFix } from 'theme-fix'
import { ThreatPage } from './pages/workspace/asset/threat/threat-page'
import { PageNotFound } from './pages/pagenotfound'
import { MainLayout } from './layout'

export const App = () => {
	return (
		<Suspense
			fallback={
				<CgSpinner className="w-16 h-16 animate-spin text-primary-500" />
			}
		>
			<div className="min-h-full">
				<div>
					<MainLayout>
						<Routes>
							<Route path="dashboard" element={<ThreatPage />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</MainLayout>
				</div>
				<ThemeFix />
			</div>
		</Suspense>
	)
}
