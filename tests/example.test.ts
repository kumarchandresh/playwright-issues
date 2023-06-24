import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';

test('test', async ({ page }) => {
	await page.setContent(readFileSync('playground.html', { encoding: 'utf-8' }));
	const navMenu = page.locator('.nav-menu');
	for (const item of await navMenu.locator('.nav-item').all()) {
		let subCategory = '';
		const subMenu = item.locator('/ancestor::*[@class="flip-menu"]/*[@class="nav-category"]');
		if (await subMenu.count() != 0) {
			subCategory = (await subMenu.innerText()).trim();
		}
		const category = (await item.locator('/ancestor::*[@class="nav-category-container"]/*[@class="nav-category"]').innerText()).trim();
		const application = (await item.locator('.truncate-nav-item').innerText()).trim();
		if (subCategory) {
			console.log(`${category} > ${subCategory} > ${application}`);
		} else {
			console.log(`${category} > ${application}`);
		}
	}
});
