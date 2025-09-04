import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { ThemeFix } from 'theme-fix'
import { PageNotFound } from './pages/pagenotfound'
import { MainLayout } from './layout'
import { LoginPage } from './pages/login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DemoPage } from './pages/demo'
import { TelemetryPage } from './pages/workspace/asset/threat/telemetry-page'
import { AlertsPage } from './pages/workspace/asset/threat/alerts-page'
import { RulesPage } from './pages/workspace/asset/rules/rules-page'
import { SettingsPage } from './pages/workspace/settings/settings-page'
import { TeamPage } from './pages/workspace/team/team-page'
import { AISuggestionsProvider } from './contexts/ai-suggestions-context'

export const App = () => {
	return (
		<AISuggestionsProvider>
			<Suspense
				fallback={
					<CgSpinner className="w-16 h-16 animate-spin text-primary-500" />
				}
			>
				<div className="min-h-full">
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<MainLayout>
										<DemoPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/telemetry"
							element={
								<ProtectedRoute>
									<MainLayout>
										<TelemetryPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/alerts"
							element={
								<ProtectedRoute>
									<MainLayout>
										<AlertsPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/rules"
							element={
								<ProtectedRoute>
									<MainLayout>
										<RulesPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/settings"
							element={
								<ProtectedRoute>
									<MainLayout>
										<SettingsPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/team"
							element={
								<ProtectedRoute>
									<MainLayout>
										<TeamPage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="*"
							element={
								<ProtectedRoute>
									<MainLayout>
										<PageNotFound />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
					</Routes>
					<ThemeFix />
				</div>
			</Suspense>
		</AISuggestionsProvider>
	)
}
