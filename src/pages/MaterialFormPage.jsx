/**
 * Página de formulário para criar/editar material
 */
export const MaterialFormPage = ({
  novoMaterial,
  materialEditando,
  materiais,
  onCampoChange,
  onSalvar,
  onCancelar
}) => {
  const isEdit = !!materialEditando;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
          <span>{isEdit ? '✏️' : '➕'}</span>
          {isEdit ? 'Editar Material' : 'Novo Material'}
        </h2>

        {isEdit && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <p className="text-yellow-800 font-medium">
              ⚠️ Atenção: Alterações neste material afetarão todos os orçamentos que o utilizam.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nome do Material *
            </label>
            <input
              type="text"
              value={novoMaterial.nome}
              onChange={(e) => onCampoChange('nome', e.target.value)}
              placeholder="Ex: Mármore Branco Carrara"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Dimensões */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Comprimento (mm) *
              </label>
              <input
                type="number"
                value={novoMaterial.comprimento}
                onChange={(e) => onCampoChange('comprimento', e.target.value)}
                placeholder="3000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Altura (mm) *
              </label>
              <input
                type="number"
                value={novoMaterial.altura}
                onChange={(e) => onCampoChange('altura', e.target.value)}
                placeholder="2000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
              />
            </div>
          </div>

          {/* Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Preço de Custo (R$) *
              </label>
              <input
                type="number"
                value={novoMaterial.custo}
                onChange={(e) => onCampoChange('custo', e.target.value)}
                placeholder="1500.00"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Preço de Venda (R$) *
              </label>
              <input
                type="number"
                value={novoMaterial.venda}
                onChange={(e) => onCampoChange('venda', e.target.value)}
                placeholder="2000.00"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
            >
              {isEdit ? '💾 Salvar Alterações' : '➕ Adicionar Material'}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 py-3 px-6 rounded-lg font-bold transition-colors"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>

        {isEdit && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              <strong>Material sendo editado:</strong> {materialEditando.nome}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
