import { test, expect } from '@playwright/test';

test('deve abrir a página de Web Inputs', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await expect(
    page.getByRole('heading', { name: /Web inputs page/i })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Display Inputs' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Clear Inputs' })
  ).toBeVisible();
});

test('deve apresentar todos os campos de entrada', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  const numberInput = page.getByLabel('Input: Number');
  const textInput = page.getByLabel('Input: Text');
  const passwordInput = page.getByLabel('Input: Password');
  const dateInput = page.getByLabel('Input: Date');

  await expect(numberInput).toBeVisible();
  await expect(textInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(dateInput).toBeVisible();
});

test('deve exibir o texto informado', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  const textInput = page.getByLabel('Input: Text');
  const texto = 'Teste com Playwright';

  await textInput.fill(texto);
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText(texto);
});

test('deve exibir o número informado', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Number').fill('2026');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('2026');
});

test('deve processar vários campos preenchidos', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Number').fill('16');
  await page.getByLabel('Input: Text').fill('SENAI');
  await page.getByLabel('Input: Password').fill('teste123');
  await page.getByLabel('Input: Date').fill('2026-09-16');

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('16');
  await expect(page.locator('body')).toContainText('SENAI');
  await expect(page.locator('body')).toContainText('teste123');
  await expect(page.locator('body')).toContainText('2026');
});

test('deve limpar os campos preenchidos', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Number').fill('16');
  await page.getByLabel('Input: Text').fill('SENAI');
  await page.getByLabel('Input: Password').fill('teste123');
  await page.getByLabel('Input: Date').fill('2026-09-16');

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(page.getByLabel('Input: Number')).toHaveValue('');
  await expect(page.getByLabel('Input: Text')).toHaveValue('');
  await expect(page.getByLabel('Input: Password')).toHaveValue('');
  await expect(page.getByLabel('Input: Date')).toHaveValue('');
});

test('deve preencher exibir e limpar os dados', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Number').fill('42');
  await page.getByLabel('Input: Text').fill('SENAI');
  await page.getByLabel('Input: Password').fill('senha123');

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('42');
  await expect(page.locator('body')).toContainText('SENAI');
  await expect(page.locator('body')).toContainText('senha123');

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(page.getByLabel('Input: Number')).toHaveValue('');
  await expect(page.getByLabel('Input: Text')).toHaveValue('');
  await expect(page.getByLabel('Input: Password')).toHaveValue('');
});

test('deve exibir o valor Playwright no campo de texto', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Text').fill('Playwright');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('Playwright');
});

test('deve exibir o valor Teste automatizado 2026 no campo de texto', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Text').fill('Teste automatizado 2026');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('Teste automatizado 2026');
});

test('deve exibir o valor SENAI - Desenvolvimento de Sistemas no campo de texto', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/inputs');

  await page.getByLabel('Input: Text').fill('SENAI - Desenvolvimento de Sistemas');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.locator('body')).toContainText('SENAI - Desenvolvimento de Sistemas');
});
