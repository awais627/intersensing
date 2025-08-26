export interface ConfigValueItem {
	value: string
	label: string
}

export interface ConfigSectorItem {
	value: string
	label: string
	sectorId: number
}

export const ManagedBrands: ConfigValueItem[] = [
	{ value: '1-5', label: 'Less than 5' },
	{ value: '5+', label: 'More than 5' },
	{ value: '20+', label: 'More than 20' },
	{ value: '50+', label: 'Mora than 50' }
]

export const SectorTypes: ConfigSectorItem[] = [
	{ sectorId: 0, value: 'agriculture', label: 'Agriculture' },
	{ sectorId: 1, value: 'automotive', label: 'Automotive' },
	{ sectorId: 2, value: 'construction', label: 'Construction' },
	{ sectorId: 3, value: 'consulting', label: 'Consulting' },
	{ sectorId: 4, value: 'consumer_goods', label: 'Consumer goods' },
	{ sectorId: 5, value: 'education', label: 'Education' },
	{ sectorId: 6, value: 'energy', label: 'Energy' },
	{ sectorId: 7, value: 'financial_services', label: 'Financial services' },
	{ sectorId: 8, value: 'healthcare', label: 'Healthcare' },
	{ sectorId: 9, value: 'hospitality', label: 'Hospitality' },
	{ sectorId: 10, value: 'insurance', label: 'Insurance' },
	{ sectorId: 11, value: 'it', label: 'IT' },
	{ sectorId: 12, value: 'local_services', label: 'Local services' },
	{ sectorId: 13, value: 'logistics', label: 'Logistics' },
	{ sectorId: 14, value: 'manufacturing', label: 'Manufacturing' },
	{ sectorId: 15, value: 'media', label: 'Media' },
	{ sectorId: 16, value: 'real_estate', label: 'Real estate' },
	{ sectorId: 17, value: 'retail', label: 'Retail' },
	{ sectorId: 18, value: 'technology', label: 'Technology' },
	{ sectorId: 19, value: 'telecommunications', label: 'Telecommunications' },
	{ sectorId: 20, value: 'transportation', label: 'Transportation' },
	{ sectorId: 21, value: 'utilities', label: 'Utilities' }
]

export const IndustryTypes: ConfigSectorItem[] = [
	{ sectorId: 0, value: 'crop_production', label: 'Crop production' },
	{ sectorId: 0, value: 'livestock_production', label: 'Livestock production' },
	{ sectorId: 0, value: 'forestry_and_logging', label: 'Forestry and logging' },
	{
		sectorId: 0,
		value: 'fishing_and_aquaculture',
		label: 'Fishing and aquaculture'
	},
	{ sectorId: 0, value: 'other_agriculture', label: 'Other Agriculture' },
	{ sectorId: 1, value: 'car_manufacturing', label: 'Car manufacturing' },
	{
		sectorId: 1,
		value: 'truck_and_commercial_vehicle_manufacturing',
		label: 'Truck and commercial vehicle manufacturing'
	},
	{
		sectorId: 1,
		value: 'motorcycle_manufacturing',
		label: 'Motorcycle manufacturing'
	},
	{
		sectorId: 1,
		value: 'auto_parts_and_accessories_manufacturing',
		label: 'Auto parts and accessories manufacturing'
	},
	{
		sectorId: 1,
		value: 'car_dealerships_and_repair_shops',
		label: 'Car dealerships and repair shops'
	},
	{ sectorId: 1, value: 'towing_services', label: 'Towing services' },
	{ sectorId: 1, value: 'other_automotive', label: 'Other automotive' },
	{
		sectorId: 2,
		value: 'residential_construction',
		label: 'Residential construction'
	},
	{
		sectorId: 2,
		value: 'commercial_construction',
		label: 'Commercial construction'
	},
	{
		sectorId: 2,
		value: 'industrial_construction',
		label: 'Industrial construction'
	},
	{
		sectorId: 2,
		value: 'infrastructure_construction',
		label: 'Infrastructure construction'
	},
	{
		sectorId: 2,
		value: 'specialty_contracting',
		label: 'Specialty contracting'
	},
	{ sectorId: 2, value: 'other_construction', label: 'Other construction' },
	{
		sectorId: 3,
		value: 'management_consulting',
		label: 'Management consulting'
	},
	{ sectorId: 3, value: 'it_consulting', label: 'IT consulting' },
	{ sectorId: 3, value: 'financial_consulting', label: 'Financial consulting' },
	{
		sectorId: 3,
		value: 'human_resources_consulting',
		label: 'Human resources consulting'
	},
	{
		sectorId: 3,
		value: 'marketing_and_advertising_consulting',
		label: 'Marketing and advertising consulting'
	},
	{ sectorId: 3, value: 'other_consulting', label: 'Other consulting' },
	{ sectorId: 4, value: 'food_and_beverage', label: 'Food and beverage' },
	{
		sectorId: 4,
		value: 'personal_care_and_cosmetics',
		label: 'Personal care and cosmetics'
	},
	{
		sectorId: 4,
		value: 'home_goods_and_appliances',
		label: 'Home goods and appliances'
	},
	{
		sectorId: 4,
		value: 'clothing_and_footwear',
		label: 'Clothing and footwear'
	},
	{ sectorId: 4, value: 'electronics', label: 'Electronics' },
	{ sectorId: 4, value: 'other_consumer_goods', label: 'Other consumer goods' },
	{
		sectorId: 5,
		value: 'primary_and_secondary_schools',
		label: 'Primary and secondary schools'
	},
	{ sectorId: 5, value: 'higher_education', label: 'Higher education' },
	{
		sectorId: 5,
		value: 'vocational_and_trade_schools',
		label: 'Vocational and trade schools'
	},
	{
		sectorId: 5,
		value: 'tutoring_and_test_prep',
		label: 'Tutoring and test prep'
	},
	{
		sectorId: 5,
		value: 'e_learning_and_online_education',
		label: 'E-learning and online education'
	},
	{ sectorId: 5, value: 'other_education', label: 'Other Education' },
	{ sectorId: 6, value: 'oil_and_gas', label: 'Oil and gas' },
	{ sectorId: 6, value: 'coal', label: 'Coal' },
	{ sectorId: 6, value: 'nuclear', label: 'Nuclear' },
	{ sectorId: 6, value: 'hydroelectric', label: 'Hydroelectric' },
	{ sectorId: 6, value: 'renewable_energy', label: 'Renewable energy' },
	{ sectorId: 6, value: 'other_energy', label: 'Other energy' },
	{ sectorId: 7, value: 'banking', label: 'Banking' },
	{
		sectorId: 7,
		value: 'investment_management',
		label: 'Investment management'
	},
	{
		sectorId: 7,
		value: 'real_estate_financing',
		label: 'Real estate financing'
	},
	{ sectorId: 7, value: 'payment_processing', label: 'Payment processing' },
	{
		sectorId: 7,
		value: 'other_financial_services',
		label: 'Other financial services'
	},
	{ sectorId: 8, value: 'hospitals', label: 'Hospitals' },
	{ sectorId: 8, value: 'medical_practices', label: 'Medical practices' },
	{ sectorId: 8, value: 'pharmaceuticals', label: 'Pharmaceuticals' },
	{ sectorId: 8, value: 'biotechnology', label: 'Biotechnology' },
	{
		sectorId: 8,
		value: 'medical_equipment_and_supplies',
		label: 'Medical equipment and supplies'
	},
	{
		sectorId: 8,
		value: 'home_care_or_elderly_care',
		label: 'Home care, or elderly cares'
	},
	{ sectorId: 8, value: 'other_healthcare', label: 'Other healthcare' },
	{ sectorId: 9, value: 'hotels_and_resorts', label: 'Hotels and resorts' },
	{
		sectorId: 9,
		value: 'restaurants_and_cafes',
		label: 'Restaurants and cafes'
	},
	{ sectorId: 9, value: 'bars_and_nightclubs', label: 'Bars and nightclubs' },
	{
		sectorId: 9,
		value: 'event_planning_and_catering',
		label: 'Event planning and catering'
	},
	{ sectorId: 9, value: 'tourism_and_travel', label: 'Tourism and travel' },
	{ sectorId: 9, value: 'other_hospitality', label: 'Other hospitality' },
	{ sectorId: 10, value: 'life_insurance', label: 'Life insurance' },
	{ sectorId: 10, value: 'health_insurance', label: 'Health insurance' },
	{
		sectorId: 10,
		value: 'property_and_casualty_insurance',
		label: 'Property and casualty insurance'
	},
	{ sectorId: 10, value: 'reinsurance', label: 'Reinsurance' },
	{
		sectorId: 10,
		value: 'risk_management_consulting',
		label: 'Risk management consulting'
	},
	{ sectorId: 10, value: 'other_insurance', label: 'Other insurance' },
	{
		sectorId: 11,
		value: 'software_development',
		label: 'Software development'
	},
	{
		sectorId: 11,
		value: 'web_design_and_development',
		label: 'Web design and development'
	},
	{ sectorId: 11, value: 'cloud_computing', label: 'Cloud computing' },
	{
		sectorId: 11,
		value: 'networking_and_security',
		label: 'Networking and security'
	},
	{
		sectorId: 11,
		value: 'data_management_and_analytics',
		label: 'Data management and analytics'
	},
	{ sectorId: 11, value: 'other_it', label: 'Other IT' },
	{
		sectorId: 12,
		value: 'home_services_(e.g._cleaning_handyman)',
		label: 'Home services (e.g. cleaning, handyman)'
	},
	{
		sectorId: 12,
		value: 'personal_services_(e.g._hairdresser_tailor)',
		label: 'Personal services (e.g. hairdresser, tailor)'
	},
	{
		sectorId: 12,
		value: 'pet_services_(e.g._grooming_walking)',
		label: 'Pet services (e.g. grooming, walking)'
	},
	{
		sectorId: 12,
		value: 'automotive_services_(e.g._detailing_maintenance_towing)',
		label: 'Automotive services (e.g. detailing, maintenance, towing)'
	},
	{
		sectorId: 12,
		value: 'professional_services_(e.g._lawyer_accountant)',
		label: 'Professional services (e.g. lawyer, accountant)'
	},
	{
		sectorId: 12,
		value: 'other_local_services',
		label: 'Other local services'
	},
	{ sectorId: 13, value: 'freight_forwarding', label: 'Freight forwarding' },
	{
		sectorId: 13,
		value: 'warehousing_and_storage',
		label: 'Warehousing and storage'
	},
	{ sectorId: 13, value: 'package_delivery', label: 'Package delivery' },
	{
		sectorId: 13,
		value: 'supply_chain_management',
		label: 'Supply chain management'
	},
	{
		sectorId: 13,
		value: 'logistics_consulting',
		label: 'Logistics consulting'
	},
	{ sectorId: 13, value: 'other_logistics', label: 'Other logistics' },
	{
		sectorId: 14,
		value: 'automotive_manufacturing',
		label: 'Automotive manufacturing'
	},
	{
		sectorId: 14,
		value: 'pharmaceutical_manufacturing',
		label: 'Pharmaceutical manufacturing'
	},
	{
		sectorId: 14,
		value: 'food_and_beverage_manufacturing',
		label: 'Food and beverage manufacturing'
	},
	{
		sectorId: 14,
		value: 'textile_and_clothing_manufacturing',
		label: 'Textile and clothing manufacturing'
	},
	{
		sectorId: 14,
		value: 'machinery_and_equipment_manufacturing',
		label: 'Machinery and equipment manufacturing'
	},
	{ sectorId: 14, value: 'other_manufacturing', label: 'Other manufacturing' },
	{ sectorId: 15, value: 'television', label: 'Television' },
	{ sectorId: 15, value: 'radio', label: 'Radio' },
	{
		sectorId: 15,
		value: 'film_and_video_production',
		label: 'Film and video production'
	},
	{ sectorId: 15, value: 'publishing', label: 'Publishing' },
	{ sectorId: 15, value: 'music', label: 'Music' },
	{ sectorId: 15, value: 'other_media', label: 'Other media' },
	{
		sectorId: 16,
		value: 'residential_real_estate',
		label: 'Residential real estate'
	},
	{
		sectorId: 16,
		value: 'commercial_real_estate',
		label: 'Commercial real estate'
	},
	{ sectorId: 16, value: 'property_management', label: 'Property management' },
	{
		sectorId: 16,
		value: 'real_estate_development_and_construction',
		label: 'Real estate development and construction'
	},
	{
		sectorId: 16,
		value: 'real_estate_brokerage',
		label: 'Real estate brokerage'
	},
	{ sectorId: 16, value: 'other_real_estate', label: 'Other real estate' },
	{ sectorId: 17, value: 'department_stores', label: 'Department stores' },
	{
		sectorId: 17,
		value: 'supermarkets_and_grocery_stores',
		label: 'Supermarkets and grocery stores'
	},
	{ sectorId: 17, value: 'convenience_stores', label: 'Convenience stores' },
	{ sectorId: 17, value: 'specialty_stores', label: 'Specialty stores' },
	{ sectorId: 17, value: 'online_retail', label: 'Online retail' },
	{ sectorId: 17, value: 'other_retail', label: 'Other retail' },
	{ sectorId: 18, value: 'software', label: 'Software' },
	{ sectorId: 18, value: 'hardware', label: 'Hardware' },
	{
		sectorId: 18,
		value: 'artificial_intelligence',
		label: 'Artificial Intelligence'
	},
	{ sectorId: 18, value: 'robotics', label: 'Robotics' },
	{ sectorId: 18, value: 'internet_of_things', label: 'Internet of things' },
	{ sectorId: 18, value: 'other_technology', label: 'Other technology' },
	{ sectorId: 19, value: 'wireless_and_mobile', label: 'Wireless and mobile' },
	{
		sectorId: 19,
		value: 'internet_service_providers',
		label: 'Internet service providers'
	},
	{ sectorId: 19, value: 'cable_and_satellite', label: 'Cable and satellite' },
	{ sectorId: 19, value: 'data_centers', label: 'Data centers' },
	{
		sectorId: 19,
		value: 'telecommunications_consulting',
		label: 'Telecommunications consulting'
	},
	{
		sectorId: 19,
		value: 'other_telecommunications',
		label: 'Other telecommunications'
	},
	{ sectorId: 20, value: 'air_transportation', label: 'Air transportation' },
	{ sectorId: 20, value: 'rail_transportation', label: 'Rail transportation' },
	{
		sectorId: 20,
		value: 'water_transportation',
		label: 'Water transportation'
	},
	{ sectorId: 20, value: 'road_transportationh', label: 'Road transportation' },
	{
		sectorId: 20,
		value: 'transit_and_ground_passenger_transportation',
		label: 'Transit and ground passenger transportation'
	},
	{
		sectorId: 20,
		value: 'other_transportation',
		label: 'Other transportation'
	},
	{ sectorId: 21, value: 'electric_utilities', label: 'Electric utilities' },
	{ sectorId: 21, value: 'gas_utilities', label: 'Gas utilities' },
	{
		sectorId: 21,
		value: 'water_and_sewage_utilities',
		label: 'Water and sewage utilities'
	},
	{
		sectorId: 21,
		value: 'waste_management_and_recycling',
		label: 'Waste management and recycling'
	},
	{
		sectorId: 21,
		value: 'renewable_energy_utilities',
		label: 'Renewable energy utilities'
	},
	{ sectorId: 21, value: 'other_utilities', label: 'Other utilities' }
]

export const AdvertisingPlatforms: ConfigValueItem[] = [
	{ value: 'google', label: 'Google Ads' },
	{ value: 'facebook', label: 'Facebook (Meta)' },
	{ value: 'bing', label: 'Bing Ads' },
	{ value: 'twitter', label: 'Twitter Ads' },
	{ value: 'linkedin', label: 'Linkedin Ads' },
	{ value: 'tiktok', label: 'TikTok' }
]
