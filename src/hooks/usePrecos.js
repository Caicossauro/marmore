import { useState, useEffect } from 'react';
import { PRECOS_PADRAO, STORAGE_KEYS } from '../constants/config';

/**
 * Hook para gerenciar configuração de preços do sistema
 * Controla preços de acabamentos e recortes com persistência no localStorage
 */
export const usePrecos = () => {
  const [precos, setPrecos] = useState(PRECOS_PADRAO);
  const [precosSalvos, setPrecosSalvos] = useState(false);
  const [mostrarPainelPrecos, setMostrarPainelPrecos] = useState(false);

  // Carregar preços salvos do localStorage ao montar
  useEffect(() => {
    const precosSalvos = localStorage.getItem(STORAGE_KEYS.PRECOS);
    if (precosSalvos) {
      try {
        setPrecos(JSON.parse(precosSalvos));
      } catch (error) {
        console.error('Erro ao carregar preços:', error);
      }
    }
  }, []);

  /**
   * Atualiza um preço específico
   * @param {string} chave - Chave do preço (ex: 'polimento', 'esquadria')
   * @param {number|string} valor - Novo valor do preço
   */
  const atualizarPreco = (chave, valor) => {
    const valorNumerico = parseFloat(valor) || 0;
    setPrecos(prev => ({
      ...prev,
      [chave]: valorNumerico
    }));
    setPrecosSalvos(false); // Indica que há mudanças não salvas
  };

  /**
   * Salva preços no localStorage com feedback visual
   */
  const salvarPrecos = () => {
    localStorage.setItem(STORAGE_KEYS.PRECOS, JSON.stringify(precos));
    setPrecosSalvos(true);

    // Remover feedback após 3 segundos
    setTimeout(() => {
      setPrecosSalvos(false);
    }, 3000);
  };

  /**
   * Toggle visibilidade do painel de preços
   */
  const togglePainelPrecos = () => {
    setMostrarPainelPrecos(prev => !prev);
  };

  return {
    precos,
    precosSalvos,
    mostrarPainelPrecos,
    atualizarPreco,
    salvarPrecos,
    togglePainelPrecos,
    setMostrarPainelPrecos
  };
};
