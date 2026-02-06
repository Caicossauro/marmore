/**
 * Página principal do sistema
 * Exibe lista de materiais e orçamentos
 */
export const HomePage = ({
  materiais,
  orcamentos,
  precos,
  mostrarPainelPrecos,
  precosSalvos,
  onNavigateMaterial,
  onNavigateOrcamento,
  onTogglePainelPrecos,
  onAtualizarPreco,
  onSalvarPrecos
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Painel de Preços (colapsável) */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
        <button
          onClick={onTogglePainelPrecos}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h2 className="text-2xl font-bold text-slate-800">Configuração de Preços</h2>
          </div>
          <span className="text-2xl text-slate-400">
            {mostrarPainelPrecos ? '▼' : '▶'}
          </span>
        </button>

        {mostrarPainelPrecos && (
          <div className="p-6 pt-0 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Acabamentos */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-600">📐 Acabamentos (por metro linear)</h3>
                <div className="space-y-3">
                  {Object.entries(precos).filter(([key]) => ['polimento', 'esquadria', 'boleado', 'canal'].includes(key)).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="flex-1 capitalize font-medium text-slate-700">{key}:</label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">R$</span>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => onAtualizarPreco(key, e.target.value)}
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          step="0.01"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recortes */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-green-600">✂️ Recortes (por unidade)</h3>
                <div className="space-y-3">
                  {Object.entries(precos).filter(([key]) => ['pia', 'cubaEsculpida', 'cooktop', 'recorte', 'pes'].includes(key)).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="flex-1 capitalize font-medium text-slate-700">
                        {key === 'pia' ? 'Cuba' : key === 'cubaEsculpida' ? 'Cuba Esculpida' : key === 'pes' ? 'Pés' : key}:
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">R$</span>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => onAtualizarPreco(key, e.target.value)}
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          step="0.01"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                💡 <strong>Dica:</strong> Estes valores serão usados automaticamente em todos os orçamentos. Clique em "Salvar" para confirmar!
              </p>
              <button
                onClick={onSalvarPrecos}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  precosSalvos
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {precosSalvos ? '✓ Salvo!' : '💾 Salvar Preços'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card de Materiais */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📦</span>
            <h2 className="text-2xl font-bold text-slate-800">Materiais Cadastrados</h2>
          </div>
          <button
            onClick={() => onNavigateMaterial('novo')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ➕ Novo Material
          </button>
        </div>

        {materiais.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Nenhum material cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materiais.map(material => (
              <div
                key={material.id}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-slate-50"
              >
                <h3 className="font-bold text-lg mb-2 text-slate-800">{material.nome}</h3>
                <div className="space-y-1 text-sm text-slate-600 mb-3">
                  <p>📏 Dimensões: {material.comprimento}mm x {material.altura}mm</p>
                  <p>💰 Custo: R$ {material.custo.toFixed(2)}/m²</p>
                  <p>💵 Venda: R$ {material.venda.toFixed(2)}/m²</p>
                  <p className="text-xs text-slate-500">
                    Área da chapa: {(material.comprimento * material.altura / 1000000).toFixed(2)}m²
                  </p>
                </div>
                <button
                  onClick={() => onNavigateMaterial('editar', material.id)}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  ✏️ Editar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card de Orçamentos */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl font-bold text-slate-800">Orçamentos</h2>
          </div>
          <button
            onClick={() => onNavigateOrcamento('novo')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ➕ Novo Orçamento
          </button>
        </div>

        {orcamentos.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Nenhum orçamento criado ainda.</p>
        ) : (
          <div className="space-y-3">
            {orcamentos.map(orc => (
              <div
                key={orc.id}
                onClick={() => onNavigateOrcamento('abrir', orc.id)}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer bg-gradient-to-r from-white to-blue-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">{orc.nome}</h3>
                    <p className="text-sm text-slate-600">
                      {orc.ambientes?.length || 0} ambiente(s) • {orc.chapas?.length || 0} chapa(s)
                    </p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
