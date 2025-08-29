import React, { useState } from 'react'
import { RulesList } from 'components/rules/rules-list'
import { CreateRuleForm } from 'components/rules/create-rule-form'
import { IMachineRule } from 'types/rules'
import { RiAddLine, RiSettings3Line } from 'react-icons/ri'
import { demoRules } from 'data/demo-rules'

export const RulesPage: React.FC = () => {
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [rules, setRules] = useState<IMachineRule[]>(demoRules)

	const handleCreateRule = (newRule: IMachineRule) => {
		setRules((prev) => [newRule, ...prev])
		setShowCreateForm(false)
	}

	const handleToggleRule = (ruleId: string) => {
		setRules((prev) =>
			prev.map((rule) =>
				rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
			)
		)
	}

	const handleDeleteRule = (ruleId: string) => {
		setRules((prev) => prev.filter((rule) => rule.id !== ruleId))
	}

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-2">
					<RiSettings3Line className="w-8 h-8 text-blue-600" />
					<h1 className="text-3xl font-bold ">Machine Rules</h1>
				</div>
				<p className="text-gray-600 text-lg">
					Configure monitoring rules and thresholds for your machines to ensure
					optimal performance and early warning detection.
				</p>
			</div>

			<div className="mb-6">
				<button
					onClick={() => setShowCreateForm(true)}
					className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					<RiAddLine className="w-5 h-5" />
					Create New Rule
				</button>
			</div>

			{showCreateForm && (
				<CreateRuleForm
					onSubmit={handleCreateRule}
					onCancel={() => setShowCreateForm(false)}
				/>
			)}

			<RulesList
				rules={rules}
				onToggleRule={handleToggleRule}
				onDeleteRule={handleDeleteRule}
			/>
		</div>
	)
}
