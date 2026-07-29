import { useState } from "react";

export const Form = () => {
  const [name, setName] = useState("");

  const movementData = {};

  async function createMovement() {
    try {
      const response = await fetch("/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movementData),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form
        id="movment-form"
        className="bg-white rounded-xl shadow-lg p-8"
        onSubmit={createMovement}
      >
        <section>
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
            Basic Information
          </h2>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Movement Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-2 "
            >
              Short Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            ></textarea>
          </div>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Execution Style
            </legend>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 ">
                <select
                  id="execution"
                  name="execution"
                  className="w-auto rounded-lg border border-gray-300 
                      bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select a style</option>
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Primary Skill Demands
            </legend>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="demand"
                  value="strength"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Strength</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="demand"
                  value="Power"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Power</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="demand"
                  value="Balance"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Balance</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="demand"
                  value="Coordination"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Coordination</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="demand"
                  value="Precision"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Precision</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Applicable Terrain Types
            </legend>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="slab"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Slab</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="vertical"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Vertical</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="overhang"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Overhang</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="roof"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Roof</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="dihedral"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Dihedral</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terrain"
                  value="arete"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Arete</span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Entry Status
            </legend>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 ">
                <select
                  id="status"
                  name="status"
                  className="w-auto rounded-lg border border-gray-300 
                      bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="">Select a Status</option>
                  <option value="draft">Draft</option>
                  <option value="needs-review">Needs Review</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>
          </fieldset>
        </section>
        <div>
          <section>
            <h3 className="text-4xl font-bold text-blue-600 mb-6">
              Teaching Information
            </h3>

            <div>
              <label htmlFor="when-to-use">When to Use It</label>
              <textarea id="when-to-use" name="when-to-use" rows={4}></textarea>
            </div>

            <div>
              <label htmlFor="how-to-perform">How to Perform It</label>
              <textarea
                id="how-to-perform"
                name="how-to-perform"
                rows={6}
              ></textarea>
            </div>

            <div>
              <label htmlFor="common-mistakes">Common Mistakes</label>
              <textarea
                id="common-mistakes"
                name="common-mistakes"
                rows={5}
              ></textarea>
            </div>
          </section>

          <section>
            <h2>Organization</h2>

            <div>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="Example: balance, overhang, hip rotation"
              />
            </div>

            <p>Separate multiple tags with commas.</p>
          </section>

          <section>
            <h2>Internal Notes</h2>

            <div>
              <label htmlFor="research-notes">Research Notes</label>
              <textarea
                id="research-notes"
                name="research-notes"
                rows={5}
              ></textarea>
            </div>

            <div>
              <label htmlFor="extra-notes">Extra Notes</label>
              <textarea id="extra-notes" name="extra-notes" rows={5}></textarea>
            </div>
          </section>
        </div>

        <button id="submitButton" type="submit">
          Create Movement
        </button>
      </form>
    </div>
  );
};
